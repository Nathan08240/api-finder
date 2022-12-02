import {
    Box,
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material'
import {DriveFileMoveOutlined, Logout} from '@mui/icons-material'
import CircularProgress, {CircularProgressProps,} from '@mui/material/CircularProgress'
import {FC, useContext} from 'react'
import {AuthContext} from "../../App";

interface SideBarProps {
    open: boolean
}

function CircularProgressWithLabel(
    props: CircularProgressProps & { value: number }
) {
    return (
        <Box sx={{position: 'relative', display: 'inline-flex'}}>
            <CircularProgress variant='determinate' {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    variant='caption'
                    component='div'
                    color='text.secondary'
                >{`${Math.round(props.value)}%`}</Typography>
            </Box>
        </Box>
    )
}

export const Sidebar: FC<SideBarProps> = ({open}) => {

    const {user, setUser, setToken} = useContext(AuthContext) as any

    const logout = () => {
        setUser(null)
        setToken(null)
    }

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
                            <Button onClick={() => logout()}>
                                <Typography>
                                    Déconnexion
                                </Typography>
                                <Logout/>
                            </Button>
                        </List>
                    )
                }
            </Paper>
        </Drawer>
    )
}
