import React from "react";
import { AppBar, Box, Toolbar, styled } from "@mui/material";

export const appBarHeight = 58;
export const footerHeight = 48;

export interface Props {
  children: JSX.Element;
}

const HomeTemplate = (props: Props) => {
  const { children } = props;

  return (
    <Root>
      <StyledAppbar position="relative" color="primary" elevation={0}>
        <StyledToolbar />
      </StyledAppbar>
      <Main>{children}</Main>
    </Root>
  );
};

const Root = styled(Box)({
  display: "grid",
  gridTemplate: '"nav appbar" "nav main"',
  gridTemplateColumns: "min-content 1fr",
  gridTemplateRows: `${appBarHeight}px 1fr`,
  gridGap: 0,
});

const Main = styled(Box)(({ theme }) => ({
  gridArea: "main",
  flexGrow: 1,
  height: `calc(100vh - ${appBarHeight}px)`,
  overflow: "auto",
  [theme.breakpoints.down("md")]: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledAppbar = styled(AppBar)({
  gridArea: "appbar",
  height: appBarHeight,
});

const StyledToolbar = styled(Toolbar)({
  paddingRight: 24, // keep right padding when drawer closed,
  display: "flex",
  justifyContent: "space-between",
  minHeight: appBarHeight,
});

export default HomeTemplate;
