import { AuthenticationError, Link, useMutation } from 'blitz'
import { FaGoogle, FaGithub, FaFacebookF } from 'react-icons/fa'
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

      <div className="bg-white p-6 rounded shadow mt-8">
        <div className="flex flex-col gap-4 justify-between mt-4">
          <a
            href="/api/auth/google"
            className="bg-red-500 rounded-lg flex items-center justify-center p-2 text-white focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
          >
            <FaGoogle className="mr-2" /> Login with Google
          </a>
          <a
            href="/api/auth/github"
            className="bg-gray-900 rounded-lg flex items-center justify-center p-2 text-white focus:outline-none focus:ring focus:ring-gray-900 focus:ring-opacity-50"
          >
            <FaGithub className="mr-2" /> Login with GitHub
          </a>
          <a
            href="/api/auth/facebook"
            className="bg-blue-600 rounded-lg flex items-center justify-center p-2 text-white focus:outline-none focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          >
            <FaFacebookF className="mr-2" /> Login with Facebook
          </a>
        </div>

        <div className="flex items-center text-center mt-8">
          <span className="flex-1 border-b border-gray-400" />
          <span className="px-2 text-gray-700">Or login with email</span>
          <span className="flex-1 border-b border-gray-400" />
        </div>

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
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
          <div>
            <Link href="/forgot-password">
              <a className="text-blue-600 underline">Forgot your password?</a>
            </Link>
          </div>
        </Form>

        <div style={{ marginTop: '1rem' }}>
          {"Don't have an account? "}
          <Link href="/signup">
            <a className="text-blue-600 underline">Sign Up</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
