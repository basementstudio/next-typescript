'use client'

import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { z } from 'zod'

import { useIsHydrated } from './use-is-hydrated'

export const useStorage = <Schema extends z.ZodTypeAny>(
  type: 'localStorage' | 'sessionStorage',
  getSchema: (zod: typeof z) => Schema,
  key: string,
  initialValue: z.infer<Schema>,
  options?: { enabled?: boolean }
) => {
  type Value = z.infer<Schema>
  const schema = React.useMemo(() => getSchema(z), [getSchema])
  const isHydrated = useIsHydrated()
  const isDisabled = options?.enabled === false || !isHydrated
  const prev = React.useRef<Value>()

  const query = useQuery<Value>({
    queryKey: [key],
    queryFn: () => {
      if (!isHydrated) return initialValue
      const storedValue = window[type].getItem(key)
      return storedValue ? schema.parse(JSON.parse(storedValue)) : initialValue
    },
    ...{ initialData: initialValue, enabled: !isDisabled }
  })

  React.useEffect(() => {
    prev.current = query.data
  }, [query.data])

  const setValue = React.useCallback(
    (valueOrUpdater: ValueOrUpdater<Value>) => {
      if (isDisabled) return
      const nextValue =
        typeof valueOrUpdater === 'function'
          ? (
              valueOrUpdater as (
                value: typeof prev.current
              ) => typeof prev.current
            )(prev.current)
          : (valueOrUpdater as Value)
      window[type].setItem(key, JSON.stringify(nextValue))
      query.refetch()
    },
    [isDisabled, key, query, type]
  )

  return [query.data, setValue, query] as const
}

type ValueOrUpdater<Value> = ((prev: Value | undefined) => Value) | Value
