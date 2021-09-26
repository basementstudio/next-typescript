import { useEffect } from 'react'
import mousetrap from 'mousetrap'

type MousetrapParameters = Parameters<typeof mousetrap.bind>

export type Traps = {
  keys: MousetrapParameters['0']
  callback: MousetrapParameters['1']
  action?: MousetrapParameters['2']
}[]

const useMousetraps = (traps: Traps, bind = true) => {
  useEffect(() => {
    if (bind) {
      traps.forEach(({ keys, callback, action }) =>
        mousetrap.bind(keys, callback, action)
      )
      return () => {
        traps.forEach(({ keys }) => mousetrap.unbind(keys))
      }
    }
  }, [traps, bind])
}

export default useMousetraps
