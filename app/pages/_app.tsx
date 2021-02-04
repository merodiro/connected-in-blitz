import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  Head,
  ErrorFallbackProps,
} from 'blitz'
import { ErrorBoundary } from 'react-error-boundary'
import { queryCache } from 'react-query'
import LoginForm from 'app/auth/components/LoginForm'

import { setup } from 'twind/shim'
import twindConfig from 'app/core/twind.config'

import 'app/core/styles/index.css'

if (typeof window !== 'undefined') {
  setup(twindConfig)
}

export default function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      resetKeys={[router.asPath]}
      onReset={() => {
        // This ensures the Blitz useQuery hooks will automatically refetch
        // data any time you reset the error boundary
        queryCache.resetErrorBoundaries()
      }}
    >
      <Head>
        <link
          rel="preload"
          href="/fonts/inter-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </ErrorBoundary>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return <LoginForm onSuccess={resetErrorBoundary} />
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error.statusCode || 400} title={error.message || error.name} />
    )
  }
}
