import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Typography,} from '@mui/material'
import {CircularProgressWithLabel} from '../../components/CircularWithProgression'
import {FC, useContext} from 'react'
import {AuthContext} from "../../App";
import ConfirmLogout from "../../components/confirm";

interface SideBarProps {
    open: boolean
}

export const Sidebar: FC<SideBarProps> = ({open}) => {

    const {user,} = useContext(AuthContext) as any

    return (
        <Drawer
            variant='persistent'
            anchor='left'
            open={!open}
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
                zIndex: 2,
            }}
        >
            <Typography variant='h5' sx={{p: 2, textAlign: 'center'}}>
                Get Dropped
            </Typography>
            <Divider/>
            <Paper
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {
                    user && (
                        <List>
                            <ListItem key='Stockage'>
                                <ListItemText>Stockage</ListItemText>
                                <ListItemIcon>
                                    <CircularProgressWithLabel value={72}/>
                                </ListItemIcon>
                            </ListItem>
                            <Divider/>
                            <ListItem key='Utilisateur'>
                                <ListItemText>Connecté :</ListItemText>
                            </ListItem>
                            <ListItemText sx={{paddingLeft: 2}}>{user?.fullname ?? " "}</ListItemText>
                            <ListItemText sx={{paddingLeft: 2}}>{user?.email ?? ' '}</ListItemText>
                            <ListItemText sx={{paddingLeft: 2}}>{user?.role ?? ' '}</ListItemText>
                            <ConfirmLogout/>
                        </List>
                    )
                }
            </Paper>
        </Drawer>
    )
}
