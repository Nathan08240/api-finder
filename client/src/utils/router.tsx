import {Login} from '../pages/login';
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../pages/error/error-page";
import {Home} from "../pages/home";
import { AppBarHead } from '../components/appbar';

export const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage/>,
    },
    {
        path: "/login",
        element:
            <>
                <AppBarHead />
                <Login/>
            </>
        ,
    },
    {
        path: "/home",
        element: <Home/>,
    }
]);

