import { AppProps } from 'next/app'
import 'css/global.css'
import { createContext, useContext, useEffect, useState } from 'react'
import { useAppGA } from 'lib/ga'

const Context = createContext<{ fontsLoaded: boolean }>({ fontsLoaded: false })
export const useAppContext = () => useContext(Context)

const App = ({ Component, pageProps }: AppProps) => {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useAppGA()

  useEffect(() => {
    // @ts-ignore
    document.fonts.ready
      .then(() => {
        setFontsLoaded(true)
      })
      .catch((error: unknown) => {
        console.error(error)
        setFontsLoaded(true)
      })
  }, [])

  return (
    <Context.Provider value={{ fontsLoaded }}>
      <Component {...pageProps} />
    </Context.Provider>
  )
}

export default App
