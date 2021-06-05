import Head from 'next/head'
import Container, { ContainerProps } from './container'

type Props = {
  children?: React.ReactNode
  contain?: boolean | ContainerProps

  // TODO after implementing head, header, footer
  // headProps: HeadProps
  // headerProps: HeaderProps
  // footerProps: FooterProps
}

const PageLayout = ({ children, contain }: Props) => {
  return (
    <>
      <Head>
        <title>next-typescript | basement.studio</title>
        {/* TODO Head */}
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
