import React from 'react'
import { useMutation } from 'blitz'
import { LabeledTextField } from 'app/core/components/LabeledTextField'
import { Form, FORM_ERROR } from 'app/core/components/Form'
import signup from 'app/auth/mutations/signup'
import { SignupInput } from 'app/auth/validations'

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div className="flex-1 max-w-xl mt-4">
      <h1 className="text-3xl font-extrabold text-center text-gray-900">Create an Account</h1>

      <Form
        className="mt-4"
        submitText="Create Account"
        schema={SignupInput}
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
        <LabeledTextField name="email" label="Email" placeholder="Email" type="email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>
    </div>
  )
}

export default SignupForm
