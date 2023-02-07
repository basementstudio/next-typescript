import { createStore } from 'zustand'
import { devtools } from 'zustand/middleware'
import { isDev } from '~/lib/constants'

// Extend this store if you need!

export interface AppStore {
  fontsLoaded: boolean
  setFontsLoaded: (fontsLoaded: boolean) => void
}

export const useAppStore = createStore<AppStore, [['zustand/devtools', never]]>(
  devtools(
    (set) => ({
      fontsLoaded: false,
      setFontsLoaded: (fontsLoaded) =>
        set({ fontsLoaded }, false, 'setFontsLoaded')
    }),
    { name: 'app-store', trace: true, enabled: isDev }
  )
)
