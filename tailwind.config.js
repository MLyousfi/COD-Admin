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
      colors: {

        // brand colors
        primary: '#232755',

        // accent colors
        info: '#0258E8',
        success: '#026712',
        danger: '#D93F4A',
        warning: '#F59523',

        // background
        normal: '#F2F2F9',
        ghost: '#E9E9EE',
        ghosted: '#FFFFFF60',
        selected: '#CDE7FF',

        dark_opacity: '#FFFFFF10',
        light_opacity: '#00000010',

        dark_selected: '#0258E8',
        dark_selected_hover: '#0258E850',

        glb_blue: '#0258E8',
        glb_red: '#ED0006'


      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui(),
  ],
}
