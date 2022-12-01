import {Login} from '../pages/login';
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../pages/error/error-page";
import {Home} from "../pages/home";

export const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login/>,
        errorElement: <ErrorPage />,
    },
    {
        path: "/home",
        element: <Home/>,
        errorElement: <ErrorPage />,
    }
]);

