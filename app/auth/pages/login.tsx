import { useRouter, BlitzPage } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { LoginForm } from 'app/auth/components/LoginForm'

const LoginPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <main className="container flex items-center justify-center h-full mx-auto">
      <LoginForm onSuccess={() => router.push('/')} />
    </main>
  )
}

LoginPage.redirectAuthenticatedTo = '/'
LoginPage.getLayout = (page) => <Layout title="Log In">{page}</Layout>

export default LoginPage
