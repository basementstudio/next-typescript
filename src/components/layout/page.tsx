import Container, { ContainerProps } from './container'
import { NextSeo } from 'next-seo'
import Head from 'next/head'

type HeadProps = {
  title?: string
  description?: string
  canonical?: string
  openGraph?: {
    url?: string
    title?: string
    description?: string
    images?: {
      url: string
      width?: number
      height?: number
      alt?: string
    }[]
    site_name?: string
  }
  twitter?: {
    handle: string
    site?: string
    cardType?: string
  }
  favicon?: string
}

type Props = {
  children?: React.ReactNode
  contain?: boolean | ContainerProps
  seo?: HeadProps

  // TODO after implementing head, header, footer
  // headerProps: HeaderProps
  // footerProps: FooterProps
}

const defaultHead: HeadProps = {
  title: 'next-typescript | basement.studio',
  description: 'next-typescript | basement.studio',
  canonical: 'https://www.basement.studio',
  openGraph: {
    url: 'https://www.basement.studio',
    title: 'next-typescript | basement.studio',
    description: 'next-typescript starter',
    images: [
      {
        url: 'https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F32979bb7-a974-4b13-a6a8-631164126ef1%2Fwallpaper.png?table=block&id=08492081-be36-4afb-b9c6-badc2b1e9523&spaceId=f63688fb-6f62-43cd-bc20-1bf78a78b2bd&width=2880&userId=c326d031-a526-4bc7-88b7-0fd5baa5b08a&cache=v2',
        width: 800,
        height: 600,
        alt: 'Basement Studio'
      }
    ],
    site_name: 'Basement Studio'
  },
  twitter: {
    handle: '@basementdot',
    site: '@basementdot',
    cardType: 'summary_large_image'
  },
  favicon: '/favicon.png'
}

const PageLayout = ({ children, contain, seo = defaultHead }: Props) => {
  return (
    <>
      <NextSeo
        title={seo.title}
        description={seo.description}
        canonical={seo.canonical}
        openGraph={seo.openGraph}
        twitter={seo.twitter}
      />
      <Head>
        <link rel="icon" href={seo.favicon} />
        <link rel="mask-icon" href={seo.favicon} />
      </Head>
      {/* TODO Header */}
      {/* <Header /> */}
      <main>
        {contain ? <Container {...contain}>{children}</Container> : children}
      </main>
      {/* TODO Footer */}
      {/* <Footer /> */}
    </>
  )
}

export default PageLayout
