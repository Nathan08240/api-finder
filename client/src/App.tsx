import {router} from "./utils/router";
import {RouterProvider} from "react-router-dom";
import {theme} from "./Themes";
import {ThemeProvider} from "@mui/material";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <RouterProvider router={router}/>
        </ThemeProvider>
    );
}

