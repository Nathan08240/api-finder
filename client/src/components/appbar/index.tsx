import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import {ArrowBack, Delete, FileDownload, FileUpload, Menu, MoreVert, Update} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { Sidebar } from "../sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

// export default function PrimarySearchAppBar() {
//     const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
//     const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
//         React.useState<null | HTMLElement>(null);
// }


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
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>

                    </Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Button
                        sx={{
                            position: "absolute",
                            left: open ? 0 : "240px",
                            transition: "left 0.2s ease-out",
                    }}
                        color="inherit"
                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                    >
                        {!open ? <ArrowBack/> : <Menu/>}
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
                <Sidebar open={open} />
            </AppBar>
            <div id="detail">
                <Outlet />
            </div>
        </>
    );
}