import type THls from 'hls.js'
import * as React from 'react'
import mergeRefs from 'react-merge-refs'

import { createObserver } from '~/hooks/use-intersection-observer'

export type MuxVideoProps = {
  muxSrc: string
  lazy?: boolean
  lazyObserverOptions?: IntersectionObserverInit
} & Omit<JSX.IntrinsicElements['video'], 'src'>

const supportsHls = (videoElm: HTMLVideoElement) =>
  videoElm.canPlayType('application/vnd.apple.mpegurl')

export const MuxVideo = React.forwardRef<HTMLVideoElement, MuxVideoProps>(
  ({ muxSrc, lazy = true, lazyObserverOptions, className, ...rest }, ref) => {
    const hls = React.useRef<THls | null>(null)
    const videoRef = React.useRef<HTMLVideoElement>(null)

    const loadVideo = React.useCallback(
      (videoElm: HTMLVideoElement) => {
        if (hls.current) {
          hls.current?.loadSource(muxSrc)
        } else if (videoElm && supportsHls(videoElm)) {
          videoElm.src = muxSrc
        } else {
          console.error('Unable to reproduce video')
        }
      },
      [muxSrc]
    )

    const importHls = React.useCallback(
      async (videoElm: HTMLVideoElement) => {
        const Hls = (await import('hls.js')).default

        if (Hls.isSupported() && videoElm) {
          // This will run in all other modern browsers
          hls.current = new Hls()
          hls.current.attachMedia(videoElm)
          hls.current.on(Hls.Events.MEDIA_ATTACHED, () => {
            !lazy && loadVideo(videoElm)

            hls.current?.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
              // Maximum quality available
              hls.current!.nextLevel ??= data.levels.length - 1
            })
          })
        } else {
          console.error("This is a legacy browser that doesn't support MSE")
        }
      },
      [lazy, loadVideo]
    )

    React.useEffect(() => {
      if (!videoRef.current) return

      const video = videoRef.current
      let intersectionObserver: IntersectionObserver

      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Some browers (safari and ie edge) support HLS natively
        video.defaultMuted = true
        !lazy && loadVideo(video)
      } else {
        importHls(video)
      }

      if (lazy) {
        intersectionObserver = createObserver(
          video,
          { ...lazyObserverOptions, triggerOnce: true },
          () => loadVideo(video)
        )
      }

      return () => {
        hls.current?.destroy?.()
        intersectionObserver?.disconnect?.()
      }
    }, [lazy, importHls, loadVideo, lazyObserverOptions])

    return (
      <video ref={mergeRefs([videoRef, ref])} className={className} {...rest} />
    )
  }
)

export const getMuxSrc = (playbackId: string) => {
  if (playbackId.startsWith('https://stream.mux.com')) return playbackId
  return `https://stream.mux.com/${playbackId}.m3u8`
}
