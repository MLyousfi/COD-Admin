import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|checkbox|chip|code|dropdown|input|navbar|pagination|progress|select|toggle|table|tabs|user|ripple|spinner|menu|divider|popover|listbox|scroll-shadow|spacer|avatar|pagination|table).js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'dark-gradient': 'linear-gradient(to bottom right, #141618, #121314)',
      },
      colors: {

        // brand colors
        primary: '#0258E8',

        // accent colors
        info: '#0258E8',
        success: '#026712',
        danger: '#ED0006',
        warning: '#F59523',

        // background
        normal: '#F2F2F9',
        ghost: '#E9E9EE',
        ghosted: '#FFFFFF60',
        selected: '#CDE7FF',


        dark_opacity: '#FFFFFF10',
        light_opacity: '#00000010',

        dark_selected: '#0258E8',
        dark_selected_hover: '#0258E815',

        glb_blue: '#0258E8',
        glb_red: '#ED0006',

        base_dark: '#141618',
        base_card: '#2d2d2d',
        base_light: '#ffffff'

      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
  ],
}