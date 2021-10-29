import 'css/global.css'

import Inspect from 'inspx'
import { AppProps } from 'next/app'
import * as React from 'react'

import { AppContextProvider } from '~/context/app'
import { useMousetrap } from '~/hooks/use-mousetrap'
import { isDev } from '~/lib/constants'
import { useAppGA } from '~/lib/ga'

const App = ({ Component, pageProps }: AppProps) => {
  useAppGA()

  if (isDev) {
    useMousetrap([
      {
        keys: ['command+i', 'ctrl+i', 'alt+i'],
        callback: () => document.body.classList.toggle('inspect')
      }
    ])
  }

  React.useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.code === `Tab`) {
        document.body.classList.add('user-is-tabbing')
      }
    }

    function handleMouseDown() {
      document.body.classList.remove('user-is-tabbing')
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('mousedown', handleMouseDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  return (
    <Inspect>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </Inspect>
  )
}

export default App
