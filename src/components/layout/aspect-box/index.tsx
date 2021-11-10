import clsx from 'clsx'
import * as React from 'react'

import s from './aspect-box.module.css'

export const AspectBox = ({
  ratio,
  children,
  className,
  style,
  ...rest
}: { ratio: number } & JSX.IntrinsicElements['div']) => {
  return (
    <div
      {...rest}
      className={clsx(s['aspect-box'], className)}
      style={{
        ...style,
        ['--ratio' as string]: `${100 / ratio}%`,
        ['--raw-ratio' as string]: ratio
      }}
    >
      {children}
    </div>
  )
}
