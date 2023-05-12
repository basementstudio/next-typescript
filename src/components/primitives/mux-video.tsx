import type THls from 'hls.js'
import * as React from 'react'
import mergeRefs from 'react-merge-refs'

export const supportsHls = (videoElm: HTMLVideoElement) =>
  Boolean(videoElm.canPlayType('application/vnd.apple.mpegurl'))

export type MuxVideoProps = {
  muxSrc: string
  lazy?: boolean
  lazyObserverOptions?: IntersectionObserverInit
} & Omit<JSX.IntrinsicElements['video'], 'src'>

let hls: THls

export const MuxVideo = React.forwardRef<HTMLVideoElement, MuxVideoProps>(
  ({ muxSrc, lazy = true, lazyObserverOptions, ...rest }, ref) => {
    const videoRef = React.useRef<HTMLVideoElement>(null)

    React.useEffect(() => {
      if (!videoRef.current) return

      // Dynamic import to prevent bundling hls.js in the client bundle if it's not needed
      const importHls = () => import('hls.js').then((module) => module.default)

      const video = videoRef.current
      const hasNativeHlsSupport = supportsHls(video)

      const loadVideo = (videoElm: HTMLVideoElement) => {
        if (hasNativeHlsSupport) {
          videoElm.src = muxSrc
        } else {
          importHls().then((Hls) => {
            if (Hls.isSupported() && videoElm) {
              if (!hls) {
                hls = new Hls()
              }

              hls.attachMedia(videoElm)

              hls.on(Hls.Events.MEDIA_ATTACHED, () => {
                hls.loadSource(muxSrc)

                hls?.on(Hls.Events.MANIFEST_PARSED, (_event, data) => {
                  // Maximum quality available
                  hls.nextLevel ??= data.levels.length - 1
                })
              })
            } else {
              console.error("This is a legacy browser that doesn't support MSE")
            }
          })
        }
      }

      let intersectionObserver: IntersectionObserver

      if (lazy) {
        intersectionObserver = new IntersectionObserver(
          ([element], observer) => {
            if (element?.isIntersecting) {
              loadVideo(video)
              observer?.disconnect?.()
            }
          },
          lazyObserverOptions
        )

        intersectionObserver.observe(video)
      } else {
        loadVideo(video)
      }

      return () => {
        intersectionObserver?.disconnect?.()
      }
    }, [muxSrc, lazy, lazyObserverOptions])

    return <video ref={mergeRefs([videoRef, ref])} {...rest} />
  }
)

export const getMuxSrc = (playbackId: string) => {
  if (playbackId.startsWith('https://stream.mux.com')) return playbackId
  return `https://stream.mux.com/${playbackId}.m3u8`
}
