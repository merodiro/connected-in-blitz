import { Document, Html, DocumentHead, Main, BlitzScript, DocumentContext } from 'blitz'
import { createElement } from 'react'
import { setup } from 'twind'
import { virtualSheet, getStyleTagProperties, shim } from 'twind/shim/server'
import twindConfig from 'app/core/twind.config'

const sheet = virtualSheet()

setup({ sheet, ...twindConfig })
class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    sheet.reset()

    const originalRenderPage = ctx.renderPage

    ctx.renderPage = async (options) => {
      let { html, head } = await originalRenderPage(options)

      html = shim(html)

      const { id, textContent } = getStyleTagProperties(sheet)

      return {
        html,
        head: [
          ...(head ?? []),
          createElement('style', {
            id: '__next' + id,
            key: id,
            dangerouslySetInnerHTML: {
              __html: textContent,
            },
          }),
        ],
      }
    }

    return Document.getInitialProps(ctx)
  }

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

export default MyDocument
