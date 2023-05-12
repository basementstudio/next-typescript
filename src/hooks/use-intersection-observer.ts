import * as React from 'react'

export type UseIntersectionObserverOptions = IntersectionObserverInit & {
  triggerOnce?: boolean
}

export const createObserver = <T = HTMLElement>(
  elm: T,
  options: UseIntersectionObserverOptions,
  handler: IntersectionObserverCallback
) => {
  const observer = new IntersectionObserver(handler, options)

  observer.observe(elm as unknown as Element)

  return observer
}

export const useIntersectionObserver = <T extends Element>(
  options: UseIntersectionObserverOptions
) => {
  const ref = React.useRef<T>(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const elementToObserve = ref.current
    if (!elementToObserve) return
    const handleObserve: IntersectionObserverCallback = ([element]) => {
      if (element) {
        setInView((p) => {
          if (options && options.triggerOnce && p === true) return p
          else return element.isIntersecting
        })
      }
    }

    const observer = createObserver(elementToObserve, options, handleObserve)

    return () => {
      observer.disconnect()
    }
  }, [options])

  return [ref, inView] as const
}
