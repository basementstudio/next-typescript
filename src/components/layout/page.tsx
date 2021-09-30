import { Container, ContainerProps } from './container'
import Head, { HeadProps } from 'components/common/head'

type Props = {
  children?: React.ReactNode
  contain?: boolean | ContainerProps
  headProps?: HeadProps

  // TODO after implementing head, header, footer
  // headerProps?: HeaderProps
  // footerProps?: FooterProps
}

export const PageLayout = ({ children, contain, headProps }: Props) => {
  return (
    <>
      <Head {...headProps} />
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
