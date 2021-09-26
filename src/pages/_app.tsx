import 'css/global.css'
import { AppProps } from 'next/app'
import { useAppGA } from 'lib/ga'
import { AppContextProvider } from 'context/app'
import useMousetraps from 'hooks/use-mouse-trap'
import { isDev } from 'lib/constants'

const App = ({ Component, pageProps }: AppProps) => {
  if (isDev) {
    useMousetraps([
      {
        keys: ['command+i', 'ctrl+i', 'alt+i'],
        callback: () => document.body.classList.toggle('inspect')
      }
    ])
  }

  useAppGA()

  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default App
