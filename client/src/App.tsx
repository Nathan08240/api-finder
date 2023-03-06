import { BrowserRouter } from "react-router-dom";
import Router from "./pages/router";
import { theme } from "./Themes";
import { ThemeProvider } from "@mui/material";
import { type Context, createContext, useEffect, useState } from "react";
import { Login } from "./components/Login";

export let AuthContext: Context<any>;

export default function App() {
  const [token, setToken] = useState<null | string>(
    localStorage.getItem("authToken") ?? null
  );
  const [user, setUser] = useState<null | any>(
    token && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")!)
      : null
  );
  const [promotion, setPromotion] = useState<null | string>(
    localStorage.getItem("promotion")
      ? localStorage.getItem("promotion")!
      : null
  );
  const [location, setLocation] = useState<null | string>(
    `/${promotion}/${user?.lastname}_${user?.firstname}`
  );
  AuthContext = createContext({
    location,
    token,
    user,
    promotion,
    setLocation,
    setUser,
    setToken,
    setPromotion,
  });

  useEffect(() => {
    token
      ? localStorage.setItem("authToken", token)
      : localStorage.removeItem("authToken");
    token
      ? localStorage.setItem("user", JSON.stringify(user))
      : localStorage.removeItem("user");
    user?.exp < Date.now() / 1000 ? (setUser(null), setToken(null)) : null;
    location
      ? localStorage.setItem("location", location)
      : localStorage.removeItem("location");
    promotion
      ? localStorage.setItem("promotion", promotion)
      : localStorage.removeItem("promotion");
  }, [token, user, location, promotion]);

  return (
    <AuthContext.Provider
      value={{
        location,
        user,
        promotion,
        token,
        setLocation,
        setToken,
        setPromotion,
        setUser,
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {!user?.is_confirmed ? <Login /> : <Router />}
        </BrowserRouter>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}
