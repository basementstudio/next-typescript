import { useState } from 'react'

export const useImageImageFadeIn = () => {
  const [loaded, setLoaded] = useState(false)
  return {
    style: { opacity: loaded ? 1 : 0, transition: 'opacity 200ms ease' },
    onLoad: () => {
      setLoaded(true)
    }
  }
}
