import React from 'react';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material'
import { CircularProgressWithLabel } from '../../components/CircularWithProgression'
import { FC, useContext } from 'react'
import { AuthContext } from "../../App";
import ConfirmLogout from '../../components/Confirm'
import CreateFolder from '../../components/CreateFolder'
import UploadModal from '../../components/uploadModal';
import HomeIcon from '@mui/icons-material/Home';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import DriveFolderUploadRoundedIcon from '@mui/icons-material/DriveFolderUploadRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import DriveFileMoveRoundedIcon from '@mui/icons-material/DriveFileMoveRounded';

interface SideBarProps {
    open: boolean
}

interface RoleParams {
    role: string
}

export const Sidebar: FC<SideBarProps> = ({ open }) => {
    const { user } = useContext(AuthContext) as any

    const role = ({ role }: RoleParams) => {
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

    const [openUploadModal, setOpenUploadModal] = React.useState(false);
    const handleOpenUploadModal = () => setOpenUploadModal(true);
    const handleCloseUploadModal = () => setOpenUploadModal(false);

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
                                <ListItem key="bibliotheque" onClick={() => alert("bibliothèque")} style={{ cursor: 'pointer' }}
                                >
                                    <ListItemIcon>
                                        <HomeIcon />
                                    </ListItemIcon>
                                    <ListItemText>Bibliothèque</ListItemText>
                                </ListItem>
                                <CreateFolder />
                                <ListItem key="importerDossier" onClick={() => alert("importer dossier")} style={{ cursor: 'pointer' }}
                                >
                                    <ListItemIcon>
                                        <DriveFolderUploadRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText>Importer un dossier</ListItemText>
                                </ListItem>
                                <ListItem key="importerFichier" onClick={handleOpenUploadModal} style={{ cursor: 'pointer' }}
                                >
                                    <ListItemIcon>
                                        <UploadFileRoundedIcon />
                                    </ListItemIcon>
                                    <ListItemText>Importer un fichier</ListItemText>
                                </ListItem>
                                <UploadModal open={openUploadModal} handleClose={handleCloseUploadModal} />
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
