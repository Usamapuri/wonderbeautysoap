"""Build web-ready brand assets from the originals in /brand-assets.

Usage (from the repo root):  python3 scripts/prepare_assets.py
Requires Pillow with WebP support (pip install pillow).
Video preparation also needs FFmpeg; pass --ffmpeg /path/to/ffmpeg if it is not on PATH.

Inputs
  brand-assets/source/mockups/   approved packaging renders (client-supplied, never altered)
  brand-assets/source/dielines/  flat packaging artwork; the botanicals are cropped from it
  brand-assets/source/logos/     Royal Basket Group logo (from the client's website brief deck)
  brand-assets/starter/          assets carried over from the Replit starter
  brand-assets/<upload folder>/ client-supplied November images and films (originals preserved)

Outputs
  public/brand-assets/...        WebP sized for their slot (brief §3: hero <= ~200 KB, cards <= ~80 KB)
  public/brand-assets/logos/     Royal Basket Group logo, transparent, ink and cream
  src/app/icon.png, src/app/apple-icon.png, src/app/opengraph-image.jpg
"""

import argparse
from io import BytesIO
from pathlib import Path
import shutil
import subprocess

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

# Each uploaded pair is the pack, then the matching bare-bar artwork.
CLIENT_PRODUCTS = {"aloe-vera": (1, 2), "coconut": (3, 4), "lavender": (5, 6), "lemon": (7, 8), "rose": (9, 10)}
CLIENT_PRODUCT_DIR = SRC / "product images 960px by 800px"

CLIENT_IMAGES = [
    ("801px by 1200px pintrest/1.png", "campaign/pure-care-hero.webp", 801),
    ("1200px by 801px pics/1.png", "campaign/rose-ritual.webp", 1200),
    ("1200px by 801px pics/2.png", "campaign/handwashing.webp", 1800),
    ("1024 by 1024px pintrest/7.png", "campaign/bathroom-ritual.webp", 1024),
]

# Output name -> (original, web width, poster timestamp). The clips have no spoken content.
CLIENT_VIDEOS = {
    "wonder-collection": ("1800px by 1020px.mp4", 1800, 0.2),
    "lavender-ritual": ("801 by 1200px videos/1.mp4", 800, 0.2),
    "aloe-ritual": ("801 by 1200px videos/2.mp4", 800, 1.4),
    "lavender-lather": ("801 by 1200px videos/3.mp4", 800, 1.6),
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
        supplied = Image.open(CLIENT_PRODUCT_DIR / f"{CLIENT_PRODUCTS[slug][0]}.png").convert("RGB")
        # A new URL avoids serving the previous pack shot from Next's image cache.
        save_webp(supplied, OUT / f"products/{slug}-pack.webp", max_kb=80)

    # Keep the lineup's existing 1800x1020 frame, using the supplied pack shots intact.
    lineup = Image.new("RGB", (1800, 1020), "white")
    placements = [("rose", 0, 10), ("lavender", 600, 10), ("aloe-vera", 1200, 10), ("lemon", 300, 510), ("coconut", 900, 510)]
    for slug, x, y in placements:
        pack = Image.open(CLIENT_PRODUCT_DIR / f"{CLIENT_PRODUCTS[slug][0]}.png").convert("RGB")
        pack.thumbnail((600, 500), Image.LANCZOS)
        lineup.paste(pack, (x, y))
    save_webp(lineup, OUT / "products/lineup-packs.webp", max_kb=200)

    # Social share card: show all five new pack shots without cropping any packaging.
    og = Image.new("RGB", (1200, 630), PAPER)
    group = lineup.copy()
    group.thumbnail(og.size, Image.LANCZOS)
    og.paste(group, ((og.width - group.width) // 2, (og.height - group.height) // 2))
    og.save(APP / "opengraph-image.jpg", quality=86)
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


def client_images() -> None:
    """Resize supplied images without retouching the artwork or packaging."""
    print("Client images")
    for slug, (_, number) in CLIENT_PRODUCTS.items():
        im = Image.open(CLIENT_PRODUCT_DIR / f"{number}.png").convert("RGB")
        save_webp(im, OUT / f"flavors/{slug}-bar.webp", max_kb=150)
    for original, output, width in CLIENT_IMAGES:
        im = Image.open(SRC / original).convert("RGB")
        save_webp(fit_width(im, width), OUT / output, max_kb=150)


def client_videos(ffmpeg: str | None) -> None:
    """Create silent, inline-playable MP4s and matching still-image fallbacks."""
    print("Client videos")
    for name, (original, width, timestamp) in CLIENT_VIDEOS.items():
        source = SRC / original
        output = OUT / f"videos/{name}.mp4"
        poster = OUT / f"videos/{name}-poster.webp"
        if output.is_file() and poster.is_file() and min(output.stat().st_mtime, poster.stat().st_mtime) >= source.stat().st_mtime:
            print(f"  {name}: up to date")
            continue
        if not ffmpeg:
            raise RuntimeError("FFmpeg is required to prepare new videos. Pass --ffmpeg /path/to/ffmpeg.")
        output.parent.mkdir(parents=True, exist_ok=True)
        # Stage the encode so a failed run cannot replace a working public video.
        pending = output.with_name(f"{name}.pending.mp4")
        try:
            subprocess.run([
                ffmpeg, "-hide_banner", "-loglevel", "error", "-y", "-i", str(source),
                "-map", "0:v:0", "-vf", f"scale={width}:-2", "-c:v", "libx264",
                "-preset", "slow", "-crf", "23", "-pix_fmt", "yuv420p", "-an",
                "-movflags", "+faststart", str(pending),
            ], check=True)
            frame = subprocess.run([
                ffmpeg, "-hide_banner", "-loglevel", "error", "-ss", str(timestamp),
                "-i", str(pending), "-frames:v", "1", "-f", "image2pipe", "-c:v", "png", "pipe:1",
            ], check=True, stdout=subprocess.PIPE).stdout
            save_webp(Image.open(BytesIO(frame)).convert("RGB"), poster, max_kb=150)
            pending.replace(output)
        finally:
            pending.unlink(missing_ok=True)
        print(f"  {output.relative_to(ROOT)}  {output.stat().st_size // 1024} KB")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ffmpeg", default=shutil.which("ffmpeg"), help="FFmpeg executable for video preparation")
    args = parser.parse_args()
    products()
    botanicals()
    starter()
    rbg_logo()
    client_images()
    client_videos(args.ffmpeg)
    favicon = APP / "favicon.ico"
    if favicon.exists():
        favicon.unlink()
