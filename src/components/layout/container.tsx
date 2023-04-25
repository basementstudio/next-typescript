import { clsx } from 'clsx'
import * as React from 'react'

export const Container = React.forwardRef<
  HTMLDivElement,
  JSX.IntrinsicElements['div'] & {
    as?: 'div' | 'section'
  }
>(({ className, as = 'div', ...props }, ref) => {
  const Element: React.ElementType = as
  return (
    <Element
      {...props}
      className={clsx(
        // TODO: Put some padding, max width, and margin-x auto in here!
        className
      )}
      ref={ref}
    />
  )
})

export type ContainerProps = React.ComponentProps<typeof Container>
