import {router} from "./utils/router";
import {RouterProvider} from "react-router-dom";
import {theme} from "./Themes";
import {ThemeProvider} from "@mui/material";
import {createContext} from "react";
const token = localStorage.getItem('authToken');
export  const AuthContext = createContext(token);

export default function App() {
    return (
        <AuthContext.Provider value={token}>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </AuthContext.Provider>
    );
}

