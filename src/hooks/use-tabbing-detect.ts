import * as React from 'react'

export const useTabbingDetect = (bodyClassName = 'user-is-tabbing') => {
  const [isTabbing, setIsTabbing] = React.useState(false)

  React.useEffect(() => {
    if (isTabbing) return

    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === `Tab`) {
        setIsTabbing(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isTabbing])

  React.useEffect(() => {
    if (!isTabbing) return

    function handleMouseDown() {
      setIsTabbing(false)
    }

    window.addEventListener('mousedown', handleMouseDown)
    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [isTabbing])

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
