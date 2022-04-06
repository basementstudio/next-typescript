import * as React from 'react'

import s from './aspect-box.module.css'

export const AspectBox = React.forwardRef<
  HTMLDivElement,
  { ratio: number } & JSX.IntrinsicElements['div']
>(({ ratio, children, className, style, ...rest }, ref) => {
  return (
    <div
      className={s['aspect-box']}
      style={{
        ...style,
        ['--ratio' as string]: `${100 / ratio}%`,
        ['--raw-ratio' as string]: ratio
      }}
    >
      <div {...rest} className={className} ref={ref}>
        {children}
      </div>
    </div>
  )
})
