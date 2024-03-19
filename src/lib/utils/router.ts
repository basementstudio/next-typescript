import { siteURL } from '~/lib/constants';

export type QueryParams = { [key: string]: string | null };

/**
 * Checks if a link is external.
 * @param href The URL of the link to check.
 * @returns true if the link is external; otherwise, false.
 */
export const checkIsExternal = (href: string): boolean => {
  // Checks if 'href' starts with 'http://' or 'https://'.
  // If not, it's considered not an external link.
  if (!href.startsWith('http://') && !href.startsWith('https://')) {
    return false;
  }
  const url = new URL(href);
  // Compares the hostname of the URL with the hostname of siteURL.
  // If they're different, it's considered an external link.
  return url.hostname !== new URL(siteURL).hostname;
};
