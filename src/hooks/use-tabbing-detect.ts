import { useEffect } from 'react'

// https://medium.com/hackernoon/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2

const tabbingClass = 'user-is-tabbing'

function handleFirstTab(event: KeyboardEvent) {
  if (event.code === `Tab`) {
    document.body.classList.add(tabbingClass)
    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleClick)
  }
}

function handleClick() {
  document.body.classList.remove(tabbingClass)
  window.removeEventListener('mousedown', handleClick)
  window.addEventListener('keydown', handleFirstTab)
}

export const useTabbingDetect = () => {
  useEffect(() => {
    window.addEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleClick)

    return () => {
      window.removeEventListener('keydown', handleClick)
      window.removeEventListener('mousedown', handleFirstTab as EventListener)
    }
  }, [])

  return null
}
