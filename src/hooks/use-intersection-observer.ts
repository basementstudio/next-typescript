import * as React from 'react'

export type IntersectionObserverOptions = IntersectionObserverInit & {
  triggerOnce?: boolean
}

export const createObserver = <T = HTMLElement>(
  elm: T,
  options: IntersectionObserverOptions,
  cb: (entry: IntersectionObserverEntry) => void
) => {
  const handleObserve: IntersectionObserverCallback = ([element], observer) => {
    if (element?.isIntersecting) {
      if (options.triggerOnce) {
        observer.unobserve(elm as unknown as Element)
      }
      cb(element)
    }
  }

  const observer = new IntersectionObserver(handleObserve, options)

  observer.observe(elm as unknown as Element)

  return observer
}

export const useIntersectionObserver = <T = HTMLElement>(
  options: IntersectionObserverOptions
): [React.RefObject<T>, { inView: boolean }] => {
  const ref = React.useRef<T>(null)
  const [inView, setInView] = React.useState(false)

  React.useEffect(() => {
    const elementToObserve = ref.current
    if (!elementToObserve) return

    const observer = createObserver(elementToObserve, options, (element) => {
      setInView(() => {
        return element.isIntersecting
      })
    })

    return () => {
      observer.disconnect()
    }
  }, [options])

  return [ref, { inView }]
}
