"use client";

import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import React from "react";

interface ClientThemProviderProps {
  children: React.ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#1F7B44",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#D91212",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

const ClientThemProvider = ({ children }: ClientThemProviderProps) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ClientThemProvider;
