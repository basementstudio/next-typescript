type Props = {
  children?: React.ReactNode

  // TODO after implementing header, footer
  // headerProps?: HeaderProps
  // footerProps?: FooterProps
}

export const PageLayout = ({ children }: Props) => {
  return (
    <>
      {/* TODO Header */}
      {/* <Header /> */}
      <main>{children}</main>
      {/* TODO Footer */}
      {/* <Footer /> */}
    </>
  )
}
