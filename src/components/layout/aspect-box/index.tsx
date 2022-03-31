import clsx from 'clsx'
import * as React from 'react'

import s from './aspect-box.module.css'

export const AspectBox = React.forwardRef<
  HTMLDivElement,
  { ratio: number } & JSX.IntrinsicElements['div']
>(({ ratio, children, className, style, ...rest }, ref) => {
  return (
    <div
      {...rest}
      ref={ref}
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
})
