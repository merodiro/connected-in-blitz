import { AuthenticationError, Link, useMutation } from 'blitz'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import login from 'app/auth/mutations/login'
import { Login } from 'app/auth/validations'

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div className="flex-1 max-w-xl mt-4">
      <h1 className="text-3xl font-extrabold text-center text-gray-900">Sign in to your account</h1>

      <Form
        className="mt-4"
        submitText="Login"
        schema={Login}
        initialValues={{ email: '', password: '' }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: 'Sorry, those credentials are invalid' }
            } else {
              return {
                [FORM_ERROR]:
                  'Sorry, we had an unexpected error. Please try again. - ' + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" type="email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
        <div>
          <Link href="/forgot-password">
            <a className="text-blue-600 underline">Forgot your password?</a>
          </Link>
        </div>
      </Form>

      <div className="flex justify-between mt-4">
        <a href="/api/auth/google">Login with google</a>
        <a href="/api/auth/github">Login with github</a>
        <a href="/api/auth/facebook">Login with facebook</a>
      </div>

      <div style={{ marginTop: '1rem' }}>
        Or{' '}
        <Link href="/signup">
          <a className="text-blue-600 underline">Sign Up</a>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
