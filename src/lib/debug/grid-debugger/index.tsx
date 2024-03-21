'use client'

import cn from 'clsx'
import { useMemo } from 'react'

import { useWindowSize } from '~/hooks/use-window-size'

import s from './grid.module.scss'

interface GridDebuggerProps {
  gridClassName?: string
}

export function GridDebugger({
  gridClassName = 'layout-grid'
}: GridDebuggerProps) {
  const { width: windowWidth, height: windowHeight } = useWindowSize()

  const columns = useMemo(() => {
    // Asumimos que `getComputedStyle` y `getPropertyValue` siempre devuelven un string,
    // pero podría ser vacío. Por eso, usamos el operador || para asegurar un string antes de convertirlo a número.
    const columnsCount =
      getComputedStyle(document.documentElement).getPropertyValue(
        '--layout-columns-count'
      ) || '0'
    return parseInt(columnsCount, 10)
  }, [windowWidth, windowHeight])

  return (
    <div className={s.grid}>
      <div className={cn(gridClassName, s.debugger)}>
        {Array.from({ length: columns }).map((_, key) => (
          <span key={key} />
        ))}
      </div>
    </div>
  )
}
