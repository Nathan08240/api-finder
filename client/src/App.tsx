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
  const promotionFromLocalStorage = localStorage.getItem("promotion");
  const parsedPromotion = promotionFromLocalStorage ? JSON.parse(promotionFromLocalStorage) : null;
  const [promotion, setPromotion] = useState<null | string[]>(parsedPromotion);
  const [counter, setCounter] = useState(0);
  
  let defaultLocation = "/BDD";
  if (user?.role === "student") {
    if (promotion)
    defaultLocation = `/BDD/${promotion[0]}/${user?.lastname}_${user?.firstname}`;
  }
  const [location, setLocation] = useState<string>(defaultLocation);

  AuthContext = createContext({
    location,
    token,
    user,
    counter,
    promotion,
    setLocation,
    setUser,
    setToken,
    setPromotion,
    setCounter,
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
      ? localStorage.setItem("promotion", JSON.stringify(promotion))
      : localStorage.removeItem("promotion");
  }, [token, user, location, promotion]);

  return (
    <AuthContext.Provider
      value={{
        counter,
        location,
        user,
        promotion,
        token,
        setLocation,
        setToken,
        setPromotion,
        setUser,
        setCounter,
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
