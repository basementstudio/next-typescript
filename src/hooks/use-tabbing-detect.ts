import { useEffect } from 'react'

// https://medium.com/hackernoon/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2

const tabbingClass = 'user-is-tabbing'

function handleFirstTab(event: KeyboardEvent) {
  if (event.code === `Tab`) {
    reset()
    document.body.classList.add(tabbingClass)
    window.removeEventListener('keydown', handleFirstTab)
  }
}

function handleClick() {
  reset()
  window.addEventListener('keydown', handleFirstTab)
}

function reset() {
  document.body.classList.remove(tabbingClass)
  window.removeEventListener('keydown', handleClick)
  window.removeEventListener('mousedown', handleFirstTab as EventListener)
}

export const useTabbingDetect = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return

    window.addEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleClick)

    return () => {
      window.removeEventListener('keydown', handleFirstTab)
      window.removeEventListener('mousedown', handleClick)
    }
  }, [])

  return null
}
