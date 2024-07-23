import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Manrope",
  },
  palette: {
    primary: { main: "#aa01cc" },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        disableRipple: true,
        variant: "contained",
        color: "primary",
      },
      styleOverrides: {
        root: {
          textTransform: "inherit",
        },
      },
    },
  },
});

export default theme;
