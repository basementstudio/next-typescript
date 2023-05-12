import '~/css/global.scss'

import { Inter } from '@next/font/google'
import type { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'

import { useAppStore } from '~/context/use-app-store'
import {
  basementLog,
  gaTrackingId,
  isClient,
  isDev,
  isProd
} from '~/lib/constants'
import { GAScripts, useAppGA } from '~/lib/ga'

/* MISC */

// TODO delete this basement log if not a basement project.
if (isProd && isClient) {
  // eslint-disable-next-line no-console
  console.log(basementLog)
}

/* CUSTOM APP */

const inter = Inter({
  subsets: ['latin']
})

const App = ({ Component, pageProps, ...rest }: AppProps) => {
  if (gaTrackingId) useAppGA()

  useOverflowDebuggerInDev()
  useUserIsTabbing()
  useFontsLoaded()

  const getLayout: GetLayoutFn =
    (Component as any).getLayout ||
    (({ Component, pageProps }) => <Component {...pageProps} />)

  return (
    <>
      {gaTrackingId && <GAScripts />}
      <Head>
        <style
          type="text/css"
          dangerouslySetInnerHTML={{
            __html: `
        :root {
          --font-body: ${inter.style.fontFamily}, var(--font-system), sans-serif;
        }
        `
          }}
        />
      </Head>
      {getLayout({ Component, pageProps, ...rest })}
    </>
  )
}

/* APP HOOKS */

const useOverflowDebuggerInDev = () => {
  React.useEffect(() => {
    if (!isDev) return
    let mousetrapRef: Mousetrap.MousetrapInstance | undefined = undefined
    import('mousetrap').then(({ default: mousetrap }) => {
      mousetrapRef = mousetrap.bind(['command+i', 'ctrl+i', 'alt+i'], () => {
        document.body.classList.toggle('inspect')
      })
    })

    return () => {
      mousetrapRef?.unbind(['command+i', 'ctrl+i', 'alt+i'])
    }
  }, [])
}

const useUserIsTabbing = () => {
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
}

const useFontsLoaded = () => {
  React.useEffect(() => {
    const maxWaitTime = 1500 // tweak this as needed.

    const timeout = window.setTimeout(() => {
      onReady()
    }, maxWaitTime)

    function onReady() {
      window.clearTimeout(timeout)
      useAppStore.setState({ fontsLoaded: true })
      document.documentElement.classList.add('fonts-loaded')
    }

    try {
      document.fonts.ready
        .then(() => {
          onReady()
        })
        .catch((error: unknown) => {
          console.error(error)
          onReady()
        })
    } catch (error) {
      console.error(error)
      onReady()
    }
  }, [])
}

/* TYPES */

export type Page<P = Record<string, unknown>> = NextComponentType<
  NextPageContext,
  Record<string, unknown>,
  P
> & { getLayout?: GetLayoutFn<P> }

export type GetLayoutFn<P = Record<string, unknown>> = (
  props: Omit<AppProps<P>, 'pageProps'> & { pageProps: P }
) => React.ReactNode

/* EXPORT */

export default App
