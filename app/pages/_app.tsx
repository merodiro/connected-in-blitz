import {
  AppProps,
  ErrorComponent,
  useRouter,
  AuthenticationError,
  AuthorizationError,
  Head,
  ErrorFallbackProps,
  useQueryErrorResetBoundary,
} from 'blitz'
import { ErrorBoundary } from 'react-error-boundary'
import withTwindApp from '@twind/next/shim/app'
import { Suspense } from 'react'
import LoginForm from 'app/auth/components/LoginForm'
import twindConfig from 'app/core/twind.config'

function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page) => page)
  const router = useRouter()
  const { reset } = useQueryErrorResetBoundary()

  return (
    <Suspense fallback="Loading...">
      <ErrorBoundary
        FallbackComponent={RootErrorFallback}
        resetKeys={[router.asPath]}
        onReset={reset}
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
    </Suspense>
  )
}

function RootErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  if (error instanceof AuthenticationError) {
    return (
      <main className="container flex items-center justify-center h-full mx-auto">
        <LoginForm onSuccess={resetErrorBoundary} />
      </main>
    )
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

export default withTwindApp(twindConfig, App)
