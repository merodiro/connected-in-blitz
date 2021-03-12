import { Document, Html, DocumentHead, Main, BlitzScript } from 'blitz'
import withTwindDocument from '@twind/next/shim/document'
import twindConfig from 'app/core/twind.config'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <DocumentHead />
        <body>
          <Main />
          <BlitzScript />
        </body>
      </Html>
    )
  }
}

export default withTwindDocument(twindConfig, MyDocument)
