import {Login} from '../pages/login';
import {AppBarHead} from "../components/appbar";
import {ThemeProvider} from "@mui/material";
import {theme} from "../Themes";
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../pages/error/error-page";
import {RedirectPage} from "../pages/redirect";
export const router = createBrowserRouter([{
    path: '/',
    element:
        <ThemeProvider theme={theme}>
            <AppBarHead/>
            <RedirectPage/>
        </ThemeProvider>,
    errorElement: <ErrorPage/>,
    children: [
        {
            path: 'login',
            element: <Login/>
        },
    ]
}]);