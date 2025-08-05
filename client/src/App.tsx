import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const theme = createTheme({
  direction: "rtl", 
});

const cacheRtl = createCache({
  key: "mui-rtl",
  stylisPlugins: [],
});

function App() {
  return (
    <div className="App">
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </CacheProvider>
    </div>
  );
}

export default App;
