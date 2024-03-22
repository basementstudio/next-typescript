'use client'

import { useEffect, useRef, useState } from 'react'

import { useWindowSize } from '~/hooks/use-window-size'

import s from './grid.module.scss'

interface GridDebuggerProps {
  fixed?: boolean
}

const GridDebugger = ({ fixed = false }: GridDebuggerProps) => {
  const [columns, setColumns] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { width, height } = useWindowSize()

  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateColumns = () => {
      if (ref.current) {
        const columnsCount =
          getComputedStyle(ref.current).getPropertyValue('--columns') || '12'
        setColumns(parseInt(columnsCount, 10))
      }
    }

    updateColumns()
  }, [width, height])

  useEffect(() => {
    const toggleVisibilityOnKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'g' || e.key === 'G') {
        setIsVisible((prevIsVisible) => !prevIsVisible)
      }
    }

    window.addEventListener('keydown', toggleVisibilityOnKeyPress)

    return () => {
      window.removeEventListener('keydown', toggleVisibilityOnKeyPress)
    }
  }, [])

  return (
    <div aria-hidden className={isVisible ? s['grid'] : 'hidden'} ref={ref}>
      <div className={fixed ? s['grid--fixed'] : s['grid--fluid']}>
        {Array.from({ length: columns }, (_, key) => (
          <span key={key} />
        ))}
      </div>
    </div>
  )
}

export default GridDebugger
