import { withForms } from '@twind/forms'

const config = {
  darkMode: 'class' as const, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        pulse: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  preflight: withForms(),
}

export default config
