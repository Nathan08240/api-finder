import {router} from "./utils/router";
import {RouterProvider} from "react-router-dom";
import {theme} from "./Themes";
import {ThemeProvider} from "@mui/material";
import {type Context, createContext, useEffect, useState} from "react";
import {Login} from "./components/login";
import jwtDecode from "jwt-decode";


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
    }, [token]);

    return (
        <AuthContext.Provider value={{user, token, setToken, setUser}}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router}/>
                { !token && <Login/> }
            </ThemeProvider>
        </AuthContext.Provider>
    );
}

