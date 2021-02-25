import { BlitzPage, useRouterQuery, Link, useMutation } from 'blitz'
import Layout from 'app/core/layouts/Layout'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import { ResetPassword } from 'app/auth/validations'
import resetPassword from 'app/auth/mutations/resetPassword'

const ResetPasswordPage: BlitzPage = () => {
  const query = useRouterQuery()
  const [resetPasswordMutation, { isSuccess }] = useMutation(resetPassword)

  return (
    <div className="container flex items-center justify-center h-full mx-auto">
      <div className="flex-1 max-w-xl mt-4">
        <h1 className="text-3xl font-extrabold text-center text-gray-900">Set a New Password</h1>

        {isSuccess ? (
          <div className="mt-8">
            <h2 className="text-xl font-bold">Password Reset Successfully</h2>
            <p className="mt-4">
              Go to the <Link href="/">homepage</Link>
            </p>
          </div>
        ) : (
          <Form
            className="mt-4"
            submitText="Reset Password"
            schema={ResetPassword}
            initialValues={{ password: '', passwordConfirmation: '', token: query.token as string }}
            onSubmit={async (values) => {
              try {
                await resetPasswordMutation(values)
              } catch (error) {
                if (error.name === 'ResetPasswordError') {
                  return {
                    [FORM_ERROR]: error.message,
                  }
                } else {
                  return {
                    [FORM_ERROR]: 'Sorry, we had an unexpected error. Please try again.',
                  }
                }
              }
            }}
          >
            <LabeledTextField name="password" label="New Password" type="password" />
            <LabeledTextField
              name="passwordConfirmation"
              label="Confirm New Password"
              type="password"
            />
          </Form>
        )}
      </div>
    </div>
  )
}

ResetPasswordPage.redirectAuthenticatedTo = '/'
ResetPasswordPage.getLayout = (page) => <Layout title="Reset Your Password">{page}</Layout>

export default ResetPasswordPage
