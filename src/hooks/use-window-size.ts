import debounce from 'just-debounce-it'
import { useEffect, useState } from 'react'

interface WindowSize {
  width: number | undefined
  height: number | undefined
}

/**
 * @name useWindowSize
 * @description A React hook that listens to window size changes and returns the window's width and height.
 * @param debounceDelay The debounce delay in milliseconds.
 * @returns {WindowSize} An object containing the width and height of the window.
 */
export function useWindowSize(debounceDelay: number = 500): WindowSize {
  const [width, setWidth] = useState<number | undefined>(undefined)
  const [height, setHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    const onWindowResize = debounce(
      () => {
        // Correctly using Math.min() to ensure we get the smallest value between the inner dimensions and the documentElement's client dimensions
        setWidth(
          Math.min(window.innerWidth, document.documentElement.clientWidth)
        )
        setHeight(
          Math.min(window.innerHeight, document.documentElement.clientHeight)
        )
      },
      debounceDelay,
      true
    )

    window.addEventListener('resize', onWindowResize, false)

    // Initial call to set size
    onWindowResize()

    return () => window.removeEventListener('resize', onWindowResize, false)
  }, [debounceDelay])

  return { width, height }
}
