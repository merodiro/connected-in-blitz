import { forwardRef, PropsWithoutRef } from 'react'
import { useFormContext } from 'react-hook-form'

export interface LabeledTextAreaFieldProps
  extends PropsWithoutRef<JSX.IntrinsicElements['textarea']> {
  /** Field name. */
  name: string
  /** Field label. */
  label: string
  outerProps?: PropsWithoutRef<JSX.IntrinsicElements['div']>
}

export const LabeledTextAreaField = forwardRef<HTMLTextAreaElement, LabeledTextAreaFieldProps>(
  ({ label, outerProps, name, ...props }, ref) => {
    const {
      register,
      formState: { isSubmitting, errors },
    } = useFormContext()
    const error = Array.isArray(errors[name])
      ? errors[name].join(', ')
      : errors[name]?.message || errors[name]

    return (
      <div {...outerProps}>
        <label className="block text-sm font-medium text-gray-700">
          {label}
          <textarea
            disabled={isSubmitting}
            {...props}
            {...register(name)}
            className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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

export default LabeledTextAreaField
