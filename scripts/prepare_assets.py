"""Build web-ready brand assets from the originals in /brand-assets.

Usage (from the repo root):  python3 scripts/prepare_assets.py
Requires Pillow with WebP support (pip install pillow).

Inputs
  brand-assets/source/mockups/   approved packaging renders (client-supplied, never altered)
  brand-assets/source/dielines/  flat packaging artwork; the botanicals are cropped from it
  brand-assets/source/logos/     Royal Basket Group logo (from the client's website brief deck)
  brand-assets/starter/          assets carried over from the Replit starter

Outputs
  public/brand-assets/...        WebP sized for their slot (brief §3: hero <= ~200 KB, cards <= ~80 KB)
  public/brand-assets/logos/     Royal Basket Group logo, transparent, ink and cream
  src/app/icon.png, src/app/apple-icon.png, src/app/opengraph-image.jpg
"""

from io import BytesIO
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "brand-assets"
OUT = ROOT / "public" / "brand-assets"
APP = ROOT / "src" / "app"

PAPER = (246, 242, 232)  # --paper (Bolt cream)
INK = (37, 35, 29)  # --ink

# slug -> (mockup file, dieline file)
PRODUCTS = {
    "coconut": ("wonder-coconut-mockup.png", "Wonder_Coconut.png"),
    "aloe-vera": ("wonder-aloe-mockup.png", "Wonder_Aloe.png"),
    "lemon": ("wonder-lemon-mockup.png", "Wonder_Lemon.png"),
    "lavender": ("wonder-lavender-mockup.png", "Wonder_Lavender.png"),
    "rose": ("wonder-rose-mockup.png", "Wonder_Rose.png"),
}


def save_webp(im: Image.Image, dest: Path, max_kb: int, start_q: int = 84) -> None:
    """Save as WebP, stepping quality down until the file fits the size budget."""
    dest.parent.mkdir(parents=True, exist_ok=True)
    q = start_q
    while True:
        buf = BytesIO()
        im.save(buf, "WEBP", quality=q, method=6)
        if buf.tell() <= max_kb * 1024 or q <= 50:
            break
        q -= 4
    dest.write_bytes(buf.getvalue())
    print(f"  {dest.relative_to(ROOT)}  {im.width}x{im.height}  q{q}  {buf.tell() // 1024} KB")


def fit_width(im: Image.Image, width: int) -> Image.Image:
    if im.width <= width:
        return im
    return im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)


def fit_box(im: Image.Image, box: int) -> Image.Image:
    im = im.copy()
    im.thumbnail((box, box), Image.LANCZOS)
    return im


# --- packaging renders --------------------------------------------------------------------------


def products() -> None:
    print("Packaging renders")
    lineup = Image.open(SRC / "source/mockups/wonder-lineup-mockup.png").convert("RGB")
    save_webp(fit_width(lineup, 1800), OUT / "products/lineup.webp", max_kb=200)
    for slug, (mockup, _) in PRODUCTS.items():
        im = Image.open(SRC / "source/mockups" / mockup).convert("RGB")
        save_webp(fit_width(im, 960), OUT / f"products/{slug}.webp", max_kb=80)

    # Social share card: lineup centred on a 1200x630 canvas.
    og = lineup.copy()
    scale = max(1200 / og.width, 630 / og.height)
    og = og.resize((round(og.width * scale), round(og.height * scale)), Image.LANCZOS)
    left, top = (og.width - 1200) // 2, (og.height - 630) // 2 + 40
    og.crop((left, top, left + 1200, top + 630)).save(APP / "opengraph-image.jpg", quality=86)
    print("  src/app/opengraph-image.jpg")


# --- botanical illustrations (cropped from the flat dielines) -----------------------------------
# The front panel sits at roughly x 600-1376, y 1180-1960 on every 1688x2212 dieline. Text on the
# panel (wordmark, variety name, tagline, fold marks) is black/grey, so only neutral pixels inside
# TEXT_BOXES are removed - coloured artwork overlapping a box survives. The dashed fold line that
# crosses the illustration is in-painted from the rows beside it, the off-white paper is levelled
# to pure white, and the result is trimmed to the artwork. Output stays on white so the site can
# lay it on paper with mix-blend-mode: multiply.

PANEL = (600, 1180, 1370, 1960)
TEXT_BOXES = [
    (600, 1180, 1376, 1212),  # top fold line
    (600, 1180, 1060, 1360),  # WONDER / BEAUTY BAR wordmark
    (1095, 1205, 1376, 1285),  # variety name
    (600, 1730, 722, 1890),  # tagline tail + dieline notch on the fold
]


def is_dash(px: tuple[int, int, int]) -> bool:
    r, g, b = px
    return max(r, g, b) - min(r, g, b) < 14 and 90 < (r + g + b) / 3 < 236


def is_neutral(px: tuple[int, int, int]) -> bool:
    return max(px) - min(px) < 30


def find_fold(im: Image.Image) -> int:
    """Row of the horizontal dashed fold line, found in the left margin where nothing else is drawn."""
    px = im.load()
    best_y, best = 0, -1
    for y in range(1790, 1890):
        n = sum(1 for x in range(610, 720) if is_dash(px[x, y]))
        if n > best:
            best_y, best = y, n
    return best_y


def botanicals() -> None:
    print("Botanical illustrations")
    for slug, (_, dieline) in PRODUCTS.items():
        im = Image.open(SRC / "source/dielines" / dieline).convert("RGB")
        fold = find_fold(im)
        px = im.load()
        for y in range(fold - 3, fold + 4):
            src_y = fold - 5 if y <= fold else fold + 5
            for x in range(PANEL[0], PANEL[2]):
                if is_dash(px[x, y]) or sum(px[x, y]) > 700:
                    px[x, y] = px[x, src_y]
        for x0, y0, x1, y1 in TEXT_BOXES:
            for y in range(y0, y1):
                for x in range(x0, x1):
                    if is_neutral(px[x, y]):
                        px[x, y] = (255, 255, 255)
        im = im.point(lambda v: 255 if v >= 244 else v)

        art = im.crop(PANEL)
        mask = art.convert("L").point(lambda v: 255 if v < 238 else 0)
        l, t, r, b = mask.getbbox()
        pad = 18
        art = art.crop((max(l - pad, 0), max(t - pad, 0), min(r + pad, art.width), min(b + pad, art.height)))
        save_webp(fit_box(art, 720), OUT / f"botanicals/{slug}.webp", max_kb=60)


# --- Royal Basket Group logo -> header, footer, icons --------------------------------------------
# The client's square logo (dark artwork on cream) is keyed to transparency by luminance, cropped to
# the artwork and recoloured, so it sits cleanly on light and dark bands.


def rbg_logo() -> None:
    print("Royal Basket Group logo")
    im = Image.open(SRC / "source/logos/royal-basket-group.png").convert("L")
    alpha = im.point(lambda v: max(0, min(255, int((215 - v) * 255 / 165))))
    alpha = alpha.crop(alpha.point(lambda v: 255 if v > 40 else 0).getbbox())
    for tone, colour in (("ink", INK), ("cream", PAPER)):
        logo = Image.new("RGBA", alpha.size, colour + (255,))
        logo.putalpha(alpha)
        logo.thumbnail((480, 480), Image.LANCZOS)
        logo.save(OUT / f"logos/royal-basket-group-{tone}.png", optimize=True)
        print(f"  logos/royal-basket-group-{tone}.png {logo.size}")

    # Favicon / app icons: the ink logo centred on cream (the site's brand is Royal Basket).
    ink = Image.new("RGBA", alpha.size, INK + (255,))
    ink.putalpha(alpha)
    for name, size in (("icon.png", 512), ("apple-icon.png", 180)):
        canvas = Image.new("RGBA", (size, size), PAPER + (255,))
        g = ink.copy()
        g.thumbnail((int(size * 0.84), int(size * 0.84)), Image.LANCZOS)
        canvas.alpha_composite(g, ((size - g.width) // 2, (size - g.height) // 2))
        canvas.convert("RGB").save(APP / name)
        print(f"  src/app/{name}")


# --- starter carry-over -------------------------------------------------------------------------


def starter() -> None:
    print("Starter assets")
    for path in sorted((SRC / "starter").rglob("*")):
        if path.suffix not in {".webp", ".jpeg", ".jpg"}:
            continue
        if path.parent.name == "products":
            continue  # superseded by the approved mockups above
        if path.parent.name == "campaign":
            continue  # AI-drawn packs, not the real packaging: not allowed on the site (brief §6)
        rel = path.relative_to(SRC / "starter").with_suffix(".webp")
        im = Image.open(path).convert("RGB")
        save_webp(fit_box(im, 1200), OUT / rel, max_kb=150)


if __name__ == "__main__":
    products()
    botanicals()
    starter()
    rbg_logo()
    favicon = APP / "favicon.ico"
    if favicon.exists():
        favicon.unlink()
