import { forwardRef, PropsWithoutRef } from 'react'
import { useFormContext } from 'react-hook-form'

export interface LabeledTextFieldProps extends PropsWithoutRef<JSX.IntrinsicElements['input']> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  /** Field type. Doesn't include radio buttons and checkboxes */
  type?: 'text' | 'password' | 'email' | 'number'
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ label, outerProps, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting },
      errors,
    } = useFormContext()
    const error = Array.isArray(errors[props.name])
      ? errors[props.name].join(', ')
      : errors[props.name]?.message || errors[props.name]

    return (
      <div {...outerProps}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
          <input
            disabled={isSubmitting}
            {...props}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            ref={register}
          />
        </label>

        {error && (
          <div role="alert" className="text-red-600">
            {error}
          </div>
        )}
      </div>
    )
  }
)

export default LabeledTextField
