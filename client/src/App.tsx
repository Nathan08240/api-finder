import {BrowserRouter} from "react-router-dom";
import Router from "./pages/router";
import {theme} from "./Themes";
import {ThemeProvider} from "@mui/material";
import {type Context, createContext, useEffect, useState} from "react";
import {Login} from "./components/Login";

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
    const [promotion, setPromotion] = useState<string[] | null>(null);

    useEffect(() => {
        const promotionFromLocalStorage = JSON.parse(
            localStorage.getItem("promotion") ?? "null"
        );
        if (promotionFromLocalStorage !== null) {
            setPromotion(promotionFromLocalStorage);
        }
    }, []);

    const [counter, setCounter] = useState(0);
    let defaultLocation = "/BDD";
    if (user?.role === "student") {
        if (promotion)
        defaultLocation = `/BDD/${promotion[0]}/${user?.lastname}_${user?.firstname}`;
    }
    const [location, setLocation] = useState<null | string>(defaultLocation);
    AuthContext = createContext({
        counter,
        location,
        token,
        user,
        promotion,
        setCounter,
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
                    {!user?.is_confirmed ? <Login/> : <Router/>}
                </BrowserRouter>
            </ThemeProvider>
        </AuthContext.Provider>
    );
}
