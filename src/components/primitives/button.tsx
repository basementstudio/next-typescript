import type * as Polymorphic from '@radix-ui/react-polymorphic'
import clsx from 'clsx'
import { checkIsExternal } from 'lib/utils/router'
import Link, { LinkProps } from 'next/link'
import * as React from 'react'

// Here you'll put custom props, such as `isLoading`, `variant`, `size`...
export type ButtonProps = {
  children?: React.ReactNode
  isLoading?: boolean
}

/**
 * This `Button` is Polymorphic, so it can render any HTML element you pass (via the `as` prop).
 * Make it your own. Add variants, sizes, etc.
 *
 *
 * Look how easy is to create a ButtonLink:
 * ```tsx
 *   <Button as="a" href="https://google.com">My Button Link!</Button>
 * ```
 *
 * Also, below the `Button` is a `ButtonLink` that automatically wraps `NextLink` to it ✨
 */
const Button = React.forwardRef(
  ({ as: Comp = 'button', className, disabled, isLoading, ...props }, ref) => {
    return (
      <Comp
        {...props}
        disabled={isLoading || disabled}
        className={clsx(className)}
        ref={ref}
      />
    )
  }
) as Polymorphic.ForwardRefComponent<'button', ButtonProps>

type NextLinkProps = Pick<
  LinkProps,
  'href' | 'locale' | 'prefetch' | 'replace' | 'scroll' | 'shallow'
>

export type ButtonLinkProps = ButtonProps &
  Omit<JSX.IntrinsicElements['a'], 'href'> &
  NextLinkProps & { notExternal?: boolean }

export const ButtonLink = React.forwardRef<'a', ButtonLinkProps>(
  ({
    // NextLinkProps
    href,
    replace,
    scroll,
    shallow,
    prefetch,
    locale,
    // Rest
    notExternal,
    ...props
  }) => {
    const externalProps = React.useMemo(() => {
      const p = { target: '_blank', rel: 'noopener' }
      if (typeof href === 'string') {
        if (checkIsExternal(href)) return p
      } else if (checkIsExternal(href.href ?? '')) return p
    }, [href])

    return (
      <Link
        href={href}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        prefetch={prefetch}
        locale={locale}
        passHref
      >
        <Button
          {...(notExternal ? undefined : externalProps)}
          {...props}
          as="a"
        />
      </Link>
    )
  }
)

export default Button
