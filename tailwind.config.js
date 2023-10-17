/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    
    extend: {
      colors: {
        'button_color': '#6366F1',
        'sidenav_background': '#1C2536',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}