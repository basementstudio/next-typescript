import type { UrlObject } from 'node:url'

import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import * as React from 'react'

import { canPrefetch as defaultCanPrefetch } from '~/lib/utils/can-prefetch'
import { checkIsExternal } from '~/lib/utils/router'

export type LinkProps = {
  children: string | JSX.IntrinsicElements['a']['children']
  canPrefetch?: (href: string | UrlObject) => boolean
} & Omit<JSX.IntrinsicElements['a'], 'children'> &
  Omit<NextLinkProps, 'as' | 'passHref' | 'children'>

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ children, className, ...restProps }, ref) => {
    const {
      href,
      // NextLink Props
      canPrefetch = defaultCanPrefetch,
      replace,
      scroll = false,
      shallow,
      prefetch,
      // Rest
      ...aProps
    } = restProps

    const isExternal = checkIsExternal(href)

    const canPrefetchHref = href && canPrefetch(href)
    const shouldPrefetch = prefetch && canPrefetchHref

    const anchorProps = {
      ...(isExternal ? { rel: 'noopener noreferrer', target: '_blank' } : {}),
      ...aProps
    }

    if (!href) {
      console.warn('Link component is missing an href prop.')
      return null
    }

    return (
      <NextLink
        className={className}
        href={href}
        prefetch={shouldPrefetch ? undefined : false}
        ref={ref}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
        {...anchorProps}
      >
        {children}
      </NextLink>
    )
  }
)

export default Link
