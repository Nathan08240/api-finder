import {AppBar, Toolbar, Typography, Button} from "@mui/material";
import {Close, Delete, FileDownload, FileUpload, Menu, MoreVert, Update} from "@mui/icons-material";
import {Sidebar} from "../sidebar";
import {useState} from "react";
import { Outlet } from "react-router-dom";
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
                        
                    </Typography>
                    <Button
                        sx={{position: "absolute", left: 0}}
                        color="inherit"
                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                    >
                        {open ? <Close sx={{color: "black", zIndex: 999 }}/> : <Menu/>}
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => {
                            alert("File upload")
                        }}
                    >
                        <FileUpload />
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => {
                            alert("File download")
                        }}
                    >
                        <FileDownload />
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => {
                            alert("Rename folder/file")
                        }}
                    >
                        <Update />
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => {
                            alert("Delete")
                        }}
                    >
                        <Delete />
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => {
                            alert("More options")
                        }}
                    >
                        <MoreVert />
                    </Button>
                </Toolbar>
                <Sidebar open={open}/>
            </AppBar>
            <div id="detail">
                <Outlet/>
            </div>
        </>
    );
}