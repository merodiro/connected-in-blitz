import { styled } from '@twind/react'

const Button = styled('button', {
  base: `shadow-sm rounded-md font-medium border border-transparent transition duration-200 focus:outline-none`,

  variants: {
    size: {
      sm: `text-sm px-4 py-2`,
      md: `text-base px-6 py-3`,
    },

    variant: {
      gray: `
        bg-gray-500 text-gray-600
        hover:bg-gray-600
        focus:(ring ring-gray-500 ring-opacity-50)
      `,
      primary: `
        text-white bg-blue-600
        hover:bg-blue-700
        focus:(ring ring-blue-500 ring-opacity-50)
      `,
    },
    outlined: {
      true: `bg-transparent ring-1`,
    },
  },

  defaults: {
    variant: 'primary',
    size: 'sm',
  },

  matches: [
    {
      variant: 'gray',
      outlined: true,
      use: `ring-gray-500 hover:text-white`,
    },
    {
      variant: 'primary',
      outlined: true,
      use: `text-blue-600 ring-blue-600 hover:text-white`,
    },
  ],
})

export default Button
