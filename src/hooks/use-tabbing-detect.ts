import { useEffect } from 'react'

// https://medium.com/hackernoon/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2
function handleFirstTab(event: KeyboardEvent) {
  if (event.code === `Tab`) {
    document.body.classList.add('user-is-tabbing')
    window.removeEventListener('keydown', handleFirstTab)
  }
}

export const useTabbingDetect = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('keydown', handleFirstTab)

    return () => {
      window.removeEventListener('keydown', handleFirstTab)
    }
  }, [])

  return null
}
