import {useLocation} from "react-router-dom";

export const RedirectPage = () => {
    if (useLocation().pathname === '/') {
        window.location.href = '/login';
    }

    return (
        <>
        </>
    );

}