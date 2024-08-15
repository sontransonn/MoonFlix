import React from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";

import themeConfigs from "./configs/theme.configs";

import MainLayout from "./layout/MainLayout";
import PageWrapper from "./components/common/PageWrapper";

import routes from "./routes/routes";

const App = () => {
  const { themeMode } = useSelector((state) => state.themeMode);

  return (
    <ThemeProvider theme={themeConfigs.custom({ mode: themeMode })}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {routes.map((route, index) => (
            route.index ? (
              <Route
                index
                key={index}
                element={route.state ? (
                  <PageWrapper
                    state={route.state}
                  >
                    {route.element}
                  </PageWrapper>
                ) : route.element}
              />
            ) : (
              <Route
                path={route.path}
                key={index}
                element={route.state ? (
                  <PageWrapper
                    state={route.state}
                  >
                    {route.element}
                  </PageWrapper>
                ) : route.element}
              />
            )
          ))}
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
    </ThemeProvider>
  )
}

export default App