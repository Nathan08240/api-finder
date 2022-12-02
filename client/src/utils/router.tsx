import {Login} from '../components/login';
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../pages/error/error-page";
import {Home} from "../pages/home";
import {AppBarHead} from "../layouts/appbar";

export const router = createBrowserRouter([
    {
        path: "/",
        element:
        <>
            <AppBarHead/>
            <Home/>
        </>
        ,
        errorElement: <ErrorPage/>,
    },
], {

});

