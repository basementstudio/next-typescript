import { useState } from 'react'

export const useImageFadeIn = () => {
  const [loaded, setLoaded] = useState(false)
  return {
    style: { opacity: loaded ? undefined : 0 },
    onLoadingComplete: () => {
      setLoaded(true)
    }
  }
}
