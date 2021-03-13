import { useMutation } from 'blitz'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import signup from 'app/auth/mutations/signup'
import { Signup } from 'app/auth/validations'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div className="flex-1 max-w-xl mt-4">
      <h1 className="text-3xl font-extrabold text-center text-gray-900">Create an Account</h1>
      <div className="bg-white p-6 rounded shadow mt-8">
        <div className="flex flex-col gap-4 justify-between mt-4">
          <a
            href="/api/auth/google"
            className="bg-red-500 rounded-lg flex items-center justify-center p-2 text-white focus:outline-none focus:ring focus:ring-red-500 focus:ring-opacity-50"
          >
            <FaGoogle className="mr-2" /> Signup with Google
          </a>
          <a
            href="/api/auth/github"
            className="bg-gray-900 rounded-lg flex items-center justify-center p-2 text-white focus:outline-none focus:ring focus:ring-gray-900 focus:ring-opacity-50"
          >
            <FaGithub className="mr-2" /> Signup with GitHub
          </a>
          <a
            href="/api/auth/facebook"
            className="bg-blue-600 rounded-lg flex items-center justify-center p-2 text-white focus:outline-none focus:ring focus:ring-blue-600 focus:ring-opacity-50"
          >
            <FaFacebookF className="mr-2" /> Signup with Facebook
          </a>
        </div>

        <div className="flex items-center text-center mt-8">
          <span className="flex-1 border-b border-gray-400" />
          <span className="px-2 text-gray-700">Or Signup with email</span>
          <span className="flex-1 border-b border-gray-400" />
        </div>

        <Form
          className="mt-4"
          submitText="Create Account"
          schema={Signup}
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            try {
              await signupMutation(values)
              props.onSuccess?.()
            } catch (error) {
              if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
                // This error comes from Prisma
                return { email: 'This email is already being used' }
              } else {
                return { [FORM_ERROR]: error.toString() }
              }
            }
          }}
        >
          <LabeledTextField name="name" label="Name" placeholder="John Doe" type="text" />
          <LabeledTextField
            name="email"
            label="Email"
            placeholder="john@example.com"
            type="email"
          />
          <LabeledTextField
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
        </Form>
      </div>
    </div>
  )
}

export default SignupForm
