import React from "react";
import { hot } from "react-hot-loader/root";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "@utils/SnackbarUtils";
import theme from "@app/theme";
import Home from "@pages/Home";

import "./styles.scss";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        dense
        anchorOrigin={{
          horizontal: "center",
          vertical: "bottom",
        }}
      >
        <SnackbarUtilsConfigurator />
        <QueryClientProvider client={queryClient}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
            </Switch>
          </Router>
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default hot(App);
