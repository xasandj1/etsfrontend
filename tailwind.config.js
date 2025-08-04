/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xr: "300px",
      sx: "321px",
      xs: "376px",
      sm: "426px",
      md: "769px",
      lg: "1025px",
      xl: "1440px",
    },
    extend: {
      letterSpacing: {
        '0.4px': '0.4px',
      },
      fontFamily: {
        ttpoppins: "Poppins, sans-serif"
      },
      fontWeight: {
        regular: 400,
      },
      colors: {
        primary: "#19191C",
        black: "#000",
        white: "#FFF",
        red: "#EA3838",
        gray: "#888888",
        textColor: "#131418",
        borderColor: "#979C9E",
        dark: "#222",
        blue: "#DCE0EC",
        inputBorder: "#E7E7E7",
        bgGray: "#F6F6F6"
      },
      container: {
        center: true,
        padding: "20px",
        screens: {
          desc: "1220px"
        }
      }
    },
  },
}