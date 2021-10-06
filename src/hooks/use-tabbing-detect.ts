import * as React from 'react'

export const useTabbingDetect = (bodyClassName = 'user-is-tabbing') => {
  const [isTabbing, setIsTabbing] = React.useState(false)

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === `Tab`) {
        setIsTabbing(true)
      }
    }

    function handleMouseDown() {
      setIsTabbing(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleMouseDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  React.useEffect(() => {
    if (!bodyClassName) return
    if (isTabbing) {
      document.body.classList.add(bodyClassName)
    } else {
      document.body.classList.remove(bodyClassName)
    }
  }, [isTabbing, bodyClassName])

  return { isTabbing }
}
