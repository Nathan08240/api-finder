import React, {useState} from "react"
import {AppBar, Button, Toolbar, Typography} from "@mui/material"
import {ArrowBack, Settings} from "@mui/icons-material"
import MenuIcon from "@mui/icons-material/Menu"
import {Sidebar} from "../Sidebar"
import {Link, Outlet} from "react-router-dom"

export const AppBarHead = () => {
    const [open, setOpen] = useState(true)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <Typography variant='h6' component='div' sx={{flexGrow: 1, textAlign: "center"}}></Typography>
                    <Button
                        sx={{
                            position: "absolute",
                            left: open ? 0 : "240px",
                            transition: "left 0.2s ease-out",
                        }}
                        color='inherit'
                        onClick={open ? handleDrawerClose : handleDrawerOpen}
                    >
                        {!open ? <ArrowBack/> : <MenuIcon/>}
                    </Button>
                    <Button color='inherit'>
                        <Link to={'/settings'} style={{textDecoration: 'none', color: 'white', display :'flex', justifyContent :'center', alignItems: 'center'}}>
                            <Settings sx={{fontSize: 30}}/>
                        </Link>
                    </Button>
                </Toolbar>
                <Sidebar open={open}/>

            </AppBar>
            <div id='detail'>
                <Outlet/>
            </div>
        </>
    )
}
