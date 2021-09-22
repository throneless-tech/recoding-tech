import { createTheme } from "@mui/material/styles";

const serifFont = "'Libre Baskerville', serif";
const sansSerifFont = "'Lexend', sans-serif";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: "#000",
          fontFamily: sansSerifFont,
          fontSize: "1.2em",
          fontWeight: "bold",
          textAlign: "center",
          textTransform: "none"
        }
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#000",
          fontFamily: sansSerifFont,
          fontWeight: "bold",
          textAlign: "center"
        }
      }
    }
  },
  palette: {
    primary: {
      main: "#C2CECC"
    },
    issue: {
      main: "#FAD3CD"
    },
    policy: {
      main: "#84A4CC"
    },
    country: {
      main: "#8AA29D"
    },
    company: {
      main: "#CCC"
    },
    footer: {
      main: "#EFE9DA"
    }
  },
  typography: {
    fontFamily: serifFont,
    h1: {
      fontFamily: sansSerifFont,
      fontSize: "2.1em",
      fontWeight: "bold",
      textAlign: "center"
    },
    h2: {
      fontFamily: sansSerifFont,
      fontSize: "1.1em",
      fontWeight: "bold",
      textTransform: "uppercase"
    },
    link: {
      color: "#FF0033",
      fontFamily: sansSerifFont
    },
    overline: {
      fontFamily: sansSerifFont,
      fontSize: "1.2em",
      fontWeight: "bold",
      textTransform: "none"
    }
  }
});

export default theme;
