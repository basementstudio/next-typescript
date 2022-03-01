import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document'

import { gaTrackingId } from '~/lib/constants'
import { GAScripts } from '~/lib/ga'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          {gaTrackingId && <GAScripts />}
        </body>
      </Html>
    )
  }
}

export default MyDocument
