import { Theme, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f4d75e",
    },
    secondary: {
      main: "#e9723d",
    },
  },
});

const customizedTheme: Theme = {
  ...theme,
  components: {
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: theme.spacing(2, 3),
        },
      },
    },
  },
};

export default customizedTheme;
