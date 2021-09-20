import * as React from 'react'

const AppContext = React.createContext<{ fontsLoaded: boolean } | undefined>(
  undefined
)

export const AppContextProvider: React.FC = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = React.useState(false)

  React.useEffect(() => {
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
    <AppContext.Provider value={{ fontsLoaded }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = React.useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppContextProvider')
  }
  return context
}
