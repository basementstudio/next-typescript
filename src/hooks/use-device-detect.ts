import * as React from 'react'
import * as ReactDeviceDetect from 'react-device-detect'

type DD = {
  isMobile?: boolean
  isTablet?: boolean
  isDesktop?: boolean
  isMobileSafari?: boolean
  isMobileOnly?: boolean
  isSafari?: boolean
  isChrome?: boolean
  isFirefox?: boolean
  isMacOs?: boolean
  isWindows?: boolean
  isIOS?: boolean
  isAndroid?: boolean
  isBrowser?: boolean
}

export const useDeviceDetect = () => {
  const [dd, set] = React.useState<DD>({})

  React.useEffect(() => {
    set({
      isDesktop: ReactDeviceDetect.isDesktop,
      isMobile: ReactDeviceDetect.isMobile,
      isMobileOnly: ReactDeviceDetect.isMobileOnly,
      isMobileSafari: ReactDeviceDetect.isMobileSafari,
      isTablet: ReactDeviceDetect.isTablet,
      isChrome: ReactDeviceDetect.isChrome,
      isFirefox: ReactDeviceDetect.isFirefox,
      isSafari: ReactDeviceDetect.isSafari,
      isMacOs: ReactDeviceDetect.isMacOs,
      isWindows: ReactDeviceDetect.isWindows,
      isIOS: ReactDeviceDetect.isIOS,
      isAndroid: ReactDeviceDetect.isAndroid,
      isBrowser: ReactDeviceDetect.isBrowser
    })
  }, [])

  return dd
}
