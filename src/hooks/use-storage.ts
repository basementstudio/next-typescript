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

  const query = useQuery<Value>(
    [key],
    () => {
      if (!isHydrated) return initialValue
      const storedValue = window[type].getItem(key)
      return storedValue ? schema.parse(JSON.parse(storedValue)) : initialValue
    },
    { initialData: initialValue, enabled: !isDisabled }
  )

  const setValue = React.useCallback(
    (valueOrUpdater: ValueOrUpdater<Value>) => {
      if (isDisabled) return
      const nextValue =
        valueOrUpdater instanceof Function
          ? // @ts-expect-error (now it's failing because prev is undefined, i don't know what is prev, i think
            // here should be `valueOrUpdater(query.data)` but im nt sure
            valueOrUpdater(prev)
          : valueOrUpdater
      window[type].setItem(key, JSON.stringify(nextValue))
      query.refetch()
    },
    [isDisabled, key, query, type]
  )

  return [query.data, setValue, query] as const
}

type ValueOrUpdater<Value> = ((prev: Value | undefined) => Value) | Value
