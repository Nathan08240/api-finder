import {Login} from '../pages/login';
import {createBrowserRouter} from "react-router-dom";
import ErrorPage from "../pages/error/error-page";

export const router = createBrowserRouter([
    {

        path: "/",
        errorElement: <ErrorPage />,
        children: [
            {
                path: "team",
                element: <Login />,
            },
        ],
    },
], {
    basename: "/app",
});

