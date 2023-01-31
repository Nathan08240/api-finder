import { router } from "./utils/router";
import { RouterProvider } from "react-router-dom";
import { theme } from "./Themes";
import { ThemeProvider } from "@mui/material";
import { type Context, createContext, useEffect, useState } from "react";
import { Login } from "./components/Login";
export let AuthContext: Context<any>;


export default function App() {
    const [token, setToken] = useState<null | string>(localStorage.getItem('authToken') ?? null);
    const [user, setUser] = useState<null | any>(token && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null);
    AuthContext = createContext({
        token,
        user,
        setUser,
        setToken
    });

    useEffect(() => {
        token ? localStorage.setItem('authToken', token) : localStorage.removeItem('authToken');
        token ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user');
        user?.exp < Date.now() / 1000 ? (setUser(null), setToken(null)) : null;
    }, [token, user]);

    return (
        <AuthContext.Provider value={{ user, token, setToken, setUser }}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
                {!user?.is_confirmed ? <Login /> : <Home />}
            </ThemeProvider>
        </AuthContext.Provider>
    );
}

