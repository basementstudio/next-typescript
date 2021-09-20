import 'css/global.css'
import { AppProps } from 'next/app'
import { useAppGA } from 'lib/ga'
import { AppContextProvider } from 'context/app'

const App = ({ Component, pageProps }: AppProps) => {
  useAppGA()

  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default App
