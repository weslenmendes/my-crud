import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

import {
  SignIn as SignInService,
  ValidateToken as ValidateTokenService,
} from "../services/authServices.js";
import { getItem, setItem, removeItem } from "../utils/localStorageUtils.js";
import { notify } from "../utils/notifyUtils.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const recoveredUser = getItem("@auth");
      const token = getItem("@auth_token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await ValidateTokenService(token);
        const messageExpected = "Session valid.";

        if (response.data.message === messageExpected && recoveredUser) {
          setUser(recoveredUser);
        } else {
          SignOut();
        }
      } catch (e) {
        SignOut();
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const SignIn = async (email, password) => {
    try {
      const response = await SignInService(email, password);
      const { data } = response;

      setItem("@auth", { ...data });
      setItem("@auth_token", data.token);
      setUser(data);
      navigate("/");
      notify("Usuário logado com sucesso!", "success");
    } catch (e) {
      notify(e.response.data.message, "error");
    }
  };

  const SignOut = () => {
    try {
      removeItem("@auth");
      removeItem("@auth_token");
      setUser(null);
      navigate("/sign-in");
    } catch (e) {
      notify(e.message, "error");
    }
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, SignIn, SignOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
