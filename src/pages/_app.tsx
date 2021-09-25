import 'css/global.css'
import { AppProps } from 'next/app'
import { useAppGA } from 'lib/ga'
import { AppContextProvider } from 'context/app'
import { useMultiKeyPressTrap } from 'hooks/use-multi-key-press'
import { isDev } from 'lib/constants'

const App = ({ Component, pageProps }: AppProps) => {
  if (isDev) {
    useMultiKeyPressTrap(['control+i', 'alt+i'], () =>
      document.body.classList.toggle('inspect')
    )
  }

  useAppGA()

  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default App
