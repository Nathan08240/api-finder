import React from 'react'
import {Link} from 'react-router-dom'
import {Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Typography} from '@mui/material'
import {CircularProgressWithLabel} from '../../components/CircularWithProgression'
import {FC, useContext} from 'react'
import {makeStyles} from '@mui/styles'
import {AuthContext} from '../../App'
import ConfirmLogout from '../../components/Confirm'
import CreateFolder from '../../components/CreateFolder'
import UploadFile from '../../components/UploadFile'
import HomeIcon from '@mui/icons-material/Home'
import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded'
import DriveFileMoveRoundedIcon from '@mui/icons-material/DriveFileMoveRounded'
import PeopleIcon from '@mui/icons-material/People'
import SchoolIcon from '@mui/icons-material/School'
import {ClassNames} from '@emotion/react'

interface SideBarProps {
    open: boolean
}

interface RoleParams {
    role: string
}

const useStyles = makeStyles({
    link: {
        color: 'black',
        textDecoration: 'none',
    },
})

export const Sidebar: FC<SideBarProps> = ({open}) => {
    const {user} = useContext(AuthContext) as any
    const [activeTab, setActiveTab] = React.useState("bibliotheque")
    const classes = useStyles()

    const role = ({role}: RoleParams) => {
        switch (role) {
            case 'support':
                return 'Support'
            case 'administration':
                return 'Administration'
            case 'pilot':
                return 'Pilote'
            case 'speaker':
                return 'Intervenant'
            case 'student':
                return 'Etudiant'
            default:
                return 'Utilisateur'
        }
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
                {user?.is_confirmed ? user.fullname : 'Get Dropped'}
            </Typography>
            <Divider/>
            <Paper
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {user?.is_confirmed && (
                    <>
                        <List
                            sx={{
                                height: '90%',
                            }}
                        >
                            <ListItem
                                key='bibliotheque'
                                style={{cursor: 'pointer'}}
                                onClick={() => {
                                  setActiveTab("bibliotheque")
                                }}
                            >
                                <ListItemIcon>
                                    <HomeIcon/>
                                </ListItemIcon>
                                <Link className={classes.link} to='/'>
                                    <ListItemText>Bibliothèque</ListItemText>
                                </Link>
                            </ListItem>
                            {(user?.role === 'support' || user?.role === 'administration') && (
                                <>
                                    <ListItem
                                        key='User'
                                        style={{cursor: 'pointer'}}
                                        onClick={() => {
                                            setActiveTab("users")
                                        }}
                                    >
                                        <ListItemIcon>
                                            <PeopleIcon/>
                                        </ListItemIcon>
                                        <Link className={classes.link} to='/users'>
                                            <ListItemText>Gestion des Utilisateurs</ListItemText>
                                        </Link>
                                    </ListItem>
                                    <ListItem
                                        key='Promotion'
                                        style={{cursor: 'pointer'}}
                                        onClick={() => {
                                            setActiveTab("promotions")
                                        }}
                                    >
                                        <ListItemIcon>
                                            <SchoolIcon/>
                                        </ListItemIcon>
                                        <Link className={classes.link} to='/promotions'>
                                            <ListItemText>Gestion des Promotions</ListItemText>
                                        </Link>
                                    </ListItem>
                                </>
                            )}
                            <CreateFolder activeTab={activeTab} setActiveTab={setActiveTab}/>
                            <ListItem
                                key='importerDossier'
                                style={{
                                  cursor: 'pointer',
                                }}
                                disabled={activeTab !== "bibliotheque"}
                                onClick={() => {
                                    if (activeTab !== "bibliotheque") {
                                        return
                                    }
                                    alert("Vous ne pouvez pas importer de dossier dans la bibliothèque")
                                }
                                }
                            >
                                <ListItemIcon>
                                    <DriveFolderUploadRoundedIcon/>
                                </ListItemIcon>
                                <ListItemText>Importer un dossier</ListItemText>
                            </ListItem>
                            <UploadFile activeTab={activeTab} setActiveTab={setActiveTab}/>
                            <Divider/>
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
                            <ListItemText sx={{paddingLeft: 2}}>{user?.email ?? ' '}</ListItemText>
                            <ListItemText sx={{paddingLeft: 2}}>{role({role: user?.role})}</ListItemText>
                        </List>
                        <ConfirmLogout/>
                    </>
                )}
            </Paper>
        </Drawer>
    )
}
