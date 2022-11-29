import {AppBar, Toolbar, Typography, Button} from "@mui/material";
import {Menu,MenuOpen} from "@mui/icons-material";
import {Sidebar} from "../sidebar";
import {useState} from "react";
export const AppBarHead = () => {

    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    }

    const handleDrawerClose = () => {
        setOpen(false);
    }


    return (
        <>
            <AppBar position="absolute">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1, textAlign: "center"}}>
                        Drive Cesi
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                    >
                        {open ? <MenuOpen/> : <Menu/>}
                    </Button>
                </Toolbar>
                <Sidebar open={open}/>
            </AppBar>
        </>

    );
}