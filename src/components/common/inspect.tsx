import { InspectProps } from 'inspx'
import dynamic from 'next/dynamic'
import * as React from 'react'

const Inspect = dynamic(() => import('inspx'))

export default function Loader(props: InspectProps) {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return <React.Fragment>{props.children}</React.Fragment>
  }
  return <Inspect disabled={false} {...props} />
}
