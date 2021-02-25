import { useRouter, BlitzPage } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { SignupForm } from 'app/auth/components/SignupForm'

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <main className="container flex items-center justify-center h-full mx-auto">
      <SignupForm onSuccess={() => router.push('/')} />
    </main>
  )
}

SignupPage.redirectAuthenticatedTo = '/'
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
