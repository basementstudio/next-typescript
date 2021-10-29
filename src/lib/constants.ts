export const isDev = process.env.NODE_ENV === 'development'
export const isProd = process.env.NODE_ENV === 'production'

export const isClient = typeof window !== 'undefined'
export const isServer = !isClient

export const siteURL = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ??
    (isDev
      ? 'http://localhost:3000'
      : 'https://next-typescript.basement.studio/') // TODO: use your actual production url as default
)
export const siteOrigin = siteURL.origin

// this is not used anywhere — just for our (basement.) projects.
// you can delete it if not needed.
export const basementLog = `

   ██╗
   ██║
   ██████╗
   ██╔══██╗  ██╗
   ██████╔╝  ██╝
   ╚═════╝   
                                                                                
   From the basement. https://basement.studio
`

// todo update this data
export const defaultMeta = {
  title: 'next-typescript | basement.studio',
  description: `A minimalist's boilerplate — Next.js with TypeScript.`,
  ogImage: `${siteOrigin}/og.png`,
  twitter: {
    handle: '@basementstudio',
    site: '@basementstudio'
  }
}

// todo update this data
export const gaTrackingId = '<your-tracking-id>'
