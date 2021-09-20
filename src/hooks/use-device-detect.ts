import * as ReactDeviceDetect from 'react-device-detect'
import * as React from 'react'

export const useDeviceDetect = () => {
  const [isMobile, setIsMobile] = React.useState<boolean>()

  React.useEffect(() => {
    setIsMobile(ReactDeviceDetect.isMobile)
  }, [])

  return { isMobile }
}
