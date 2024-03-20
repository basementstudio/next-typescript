import type { UrlObject } from 'node:url'

/**
 * Checks whether the provided URL can be prefetched (i.e. is an internal URL).
 * Used by the `Link` component to determine whether to prefetch the URL.
 */

export function canPrefetch(href: string | UrlObject): boolean {
  const _href = typeof href === 'string' ? href : href.pathname

  if (!_href || /^https?:\/\/$/.exec(_href)) {
    return false
  }

  // URL constructor implemenation in Firefox crashes if url contains *
  if (_href.includes('*')) return false

  return _href.startsWith('/')
}
