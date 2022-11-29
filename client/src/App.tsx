import {Login} from './pages/login';
import {AppBarHead} from "./components/appbar";
import {ThemeProvider} from "@mui/material";
import {theme} from "./Themes";

function App() {


    return (
        <ThemeProvider theme={theme}>
            <AppBarHead/>
            <Login/>
        </ThemeProvider>
    );
}

export default App;
