"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

type CampaignVideoProps = {
  src: string
  poster: string
  label: string
  sizes: string
  position?: string
}

// Fits an existing image frame. The poster remains available if playback fails or motion is reduced.
export function CampaignVideo({ src, poster, label, sizes, position = "50% 50%" }: CampaignVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let visible = false
    const syncPlayback = () => {
      if (visible && !document.hidden && !reduced.matches) video.play().catch(() => {})
      else video.pause()
    }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      syncPlayback()
    }, { threshold: 0.25 })
    observer.observe(video)
    reduced.addEventListener("change", syncPlayback)
    document.addEventListener("visibilitychange", syncPlayback)
    return () => {
      observer.disconnect()
      reduced.removeEventListener("change", syncPlayback)
      document.removeEventListener("visibilitychange", syncPlayback)
      video.pause()
    }
  }, [src, failed])

  return (
    <>
      <Image src={poster} alt={label} fill sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
      {!failed && (
        <video
          ref={ref}
          muted
          loop
          playsInline
          preload="none"
          poster={poster}
          aria-hidden="true"
          onError={() => setFailed(true)}
          className="absolute inset-0 size-full object-cover"
          style={{ objectPosition: position }}
        >
          <source src={src} type="video/mp4" onError={() => setFailed(true)} />
        </video>
      )}
    </>
  )
}
