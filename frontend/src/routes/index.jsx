import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";
import { Cruds } from "../pages/Cruds";

import { Header } from "../components/Header";

import { AuthContext } from "../contexts/AuthContext";
import { AuthProvider } from "../providers/AuthProvider";

export const AppRoutes = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div>Loading...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/sign-in" />;
    }

    return (
      <>
        <Header />
        {children}
      </>
    );
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route
            path="/cruds/:label"
            element={
              <Private>
                <Cruds />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
