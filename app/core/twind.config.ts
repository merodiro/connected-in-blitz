import { withForms } from '@twind/forms'
import { apply, Configuration } from 'twind/css'

const config: Configuration = {
  darkMode: 'class', // or 'media' or 'class'
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
  preflight: withForms({
    '@font-face': [
      {
        fontFamily: 'Inter',
        fontWeight: '100 900',
        fontStyle: 'normal',
        src: 'url(/fonts/inter-var-latin.woff2) format("woff2")',
        unicodeRange:
          'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
        fontDisplay: 'optional',
      },
    ],
    body: {
      overflowY: 'overlay',
    },
    '::-webkit-scrollbar': apply`w-2 rounded-md bg-gray-100`,
    '::-webkit-scrollbar-thumb': apply`bg-blue-500 hover:bg-blue-600 active:bg-blue-700`,
  }),
}

export default config
