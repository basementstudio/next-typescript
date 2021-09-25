import { useState, useEffect } from 'react'

const useMultiKeyPress = () => {
  const [keysPressed, setKeyPressed] = useState(new Set<string>([]))

  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => {
      setKeyPressed((prevKeysPressed) => {
        prevKeysPressed.add(key)
        return new Set(prevKeysPressed)
      })
    }

    const upHandler = ({ key }: KeyboardEvent) => {
      setKeyPressed((prevKeysPressed) => {
        prevKeysPressed.delete(key)
        return new Set(prevKeysPressed)
      })
    }

    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)

    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, [])

  return keysPressed
}

const useMultiKeyPressTrap = (
  keyCombination: string | string[],
  cb: () => void
) => {
  const keysPressed = useMultiKeyPress()

  useEffect(() => {
    const keysPressedArr = [...keysPressed]
    const combinationRegex = new RegExp(
      (Array.isArray(keyCombination)
        ? keyCombination.map((c) => '^' + c + '$').join('|')
        : keyCombination
      ).replace(/\+/g, '\\+'),
      'i'
    )

    if (keysPressedArr.join('+').match(combinationRegex)) cb()
  }, [keysPressed, keyCombination, cb])
}

export { useMultiKeyPress, useMultiKeyPressTrap }
