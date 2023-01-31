import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../pages/error/error-page";
import {AppBarHead} from "../layouts/appbar";

export const router = createBrowserRouter([
    {
        path: "/",
        element:
        <>
            <AppBarHead/>
        </>
        ,
        errorElement: <ErrorPage/>,
    },
], {

});

