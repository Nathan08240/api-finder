import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Typography, } from '@mui/material'
import { CircularProgressWithLabel } from '../../components/CircularWithProgression'
import { FC, useContext } from 'react'
import { AuthContext } from "../../App";
import ConfirmLogout from "../../components/confirm";
import HomeIcon from '@mui/icons-material/Home';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import DriveFileMoveRoundedIcon from '@mui/icons-material/DriveFileMoveRounded';

interface SideBarProps {
    open: boolean
}

interface RoleParams {
    role: string;
}

export const Sidebar: FC<SideBarProps> = ({ open }) => {
    const { user, } = useContext(AuthContext) as any

    const role = ({ role }: RoleParams) => {
        switch (role) {
            case "support":
                return "Support"
            case "administration":
                return "Administration"
            case "pilot":
                return "Pilote"
            case "speaker":
                return "Intervenant"
            case "student":
                return "Etudiant"
            default:
                return "Utilisateur"
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
            <Typography variant='h5' sx={{ p: 2, textAlign: 'center' }}>
                {
                    user?.is_confirmed ? user.fullname : 'Get Dropped'
                }
            </Typography>
            <Divider />
            <Paper
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {
                    user?.is_confirmed && (
                        <>
                            <List sx={{
                                height: '90%',
                            }}>
                                <ListItem key="bibliotheque" onClick={() => alert("bibliothèque")}>
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText>Bibliothèque</ListItemText>
                                </ListItem>
                                <ListItem key="creerDossier" onClick={() => alert("créer un dossier")}>
                                    <ListItemIcon>
                                        <CreateNewFolderIcon />
                                    </ListItemIcon>
                                    <ListItemText>Créer un dossier</ListItemText>
                                </ListItem>
                                <ListItem key="importerDossier" onClick={() => alert("importer dossier")}>
                                    <ListItemIcon>
                                        <DriveFolderUploadRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText>Importer un dossier</ListItemText>
                                </ListItem>
                                <ListItem key="importerFichier">
                                    <ListItemIcon>
                                        <UploadFileRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText>Importer un fichier</ListItemText>
                                </ListItem>
                                <Divider />
                                <ListItem key='Stockage'>
                                    <ListItemText>Stockage</ListItemText>
                                    <ListItemIcon>
                                        <CircularProgressWithLabel value={72} />
                                    </ListItemIcon>
                                </ListItem>
                                <Divider />
                                <ListItem key='Utilisateur'>
                                    <ListItemText>Connecté :</ListItemText>
                                </ListItem>
                                <ListItemText sx={{ paddingLeft: 2 }}>{user?.email ?? ' '}</ListItemText>
                                <ListItemText sx={{ paddingLeft: 2 }}>{role({ role: user?.role })}</ListItemText>
                            </List>
                            <ConfirmLogout />
                        </>

                    )
                }
            </Paper>
        </Drawer>
    )
}
