import { useState } from 'react'

export const useImageFadeIn = () => {
  const [loaded, setLoaded] = useState(false)
  return {
    style: { opacity: loaded ? 1 : undefined, transition: 'opacity 200ms ease' },
    onLoad: () => {
      setLoaded(true)
    }
  }
}
