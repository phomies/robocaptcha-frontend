module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_light: '#F6F8FB',
        primary_dark: '#1c1c27',
        secondary_dark: '#28293d',
        tertiary_dark: '#1e1f2e',
        blue: {
          lightBlue: '#F6F8FB',
          darkBlue: '#1F58E7'
        }
      },
      fontFamily: {
        'poppins-regular': ['Poppins-Regular', 'sans-serif'],
        'poppins-medium': ['Poppins-Medium', 'sans-serif'],
        'poppins-semibold': ['Poppins-SemiBold', 'sans-serif'],
      },
    },
    
  },
  plugins: [],
}
