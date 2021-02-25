import { BlitzPage, useMutation } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import { ForgotPassword } from 'app/auth/validations'
import forgotPassword from 'app/auth/mutations/forgotPassword'

const ForgotPasswordPage: BlitzPage = () => {
  const [forgotPasswordMutation, { isSuccess }] = useMutation(forgotPassword)

  return (
    <main className="container flex items-center justify-center h-full mx-auto">
      <div className="flex-1 max-w-xl mt-4">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">Forgot your password?</h1>

        {isSuccess ? (
          <div className="mt-8">
            <h2 className="text-xl font-bold">Request Submitted</h2>
            <p className="mt-4">
              If your email is in our system, you will receive instructions to reset your password
              shortly.
            </p>
          </div>
        ) : (
          <Form
            className="mt-4"
            submitText="Send Reset Password Instructions"
            schema={ForgotPassword}
            initialValues={{ email: '' }}
            onSubmit={async (values) => {
              try {
                await forgotPasswordMutation(values)
              } catch (error) {
                return {
                  [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again.',
                }
              }
            }}
          >
            <LabeledTextField name="email" label="Email" placeholder="Email" type="email" />
          </Form>
        )}
      </div>
    </main>
  )
}

ForgotPasswordPage.redirectAuthenticatedTo = '/'
ForgotPasswordPage.getLayout = (page) => <Layout title="Forgot Your Password?">{page}</Layout>

export default ForgotPasswordPage
