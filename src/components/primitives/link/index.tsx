import { checkIsExternal } from 'lib/utils/router'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import * as React from 'react'

export type LinkProps = {
  children: string | JSX.IntrinsicElements['a']['children']
} & Omit<JSX.IntrinsicElements['a'], 'children'> &
  Omit<NextLinkProps, 'as' | 'passHref' | 'children'>

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, ...restProps }, ref) => {
    const {
      href,
      // NextLink Props
      replace,
      scroll = false,
      shallow,
      prefetch,
      // Rest
      ...aProps
    } = restProps

    const isExternal = checkIsExternal(href)

    return (
      <NextLink
        href={href}
        legacyBehavior
        passHref
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
      >
        <a
          className={className}
          ref={ref}
          rel={isExternal ? 'noopener' : undefined}
          target={isExternal ? '_blank' : undefined}
          {...aProps}
        >
          {children}
        </a>
      </NextLink>
    )
  }
)

export default Link
