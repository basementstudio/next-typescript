import 'css/global.css'

import { AppProps } from 'next/app'

import { AppContextProvider } from '~/context/app'
import { useMousetrap } from '~/hooks/use-mousetrap'
import { useTabbingDetect } from '~/hooks/use-tabbing-detect'
import { isDev } from '~/lib/constants'
import { useAppGA } from '~/lib/ga'

const App = ({ Component, pageProps }: AppProps) => {
  if (isDev) {
    useMousetrap([
      {
        keys: ['command+i', 'ctrl+i', 'alt+i'],
        callback: () => document.body.classList.toggle('inspect')
      }
    ])
  }

  useAppGA()
  useTabbingDetect()

  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  )
}

export default App
