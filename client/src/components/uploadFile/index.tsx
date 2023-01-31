import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFilePicker } from 'use-file-picker';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import { AuthContext } from '../../App'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface UploadModalProps {
    open: boolean;
    handleClose: () => void;
}

const UploadFile: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [files, setFiles] = React.useState<any>([]);
    const [openFileSelector, { filesContent, loading, errors, clear }] = useFilePicker({
        multiple: true,
    });

    React.useEffect(() => {
        setFiles([...filesContent])
    }, [filesContent])

    const { user } = React.useContext(AuthContext) as any
    const location = `/${user.lastname}_${user.firstname}/`

    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    }

    const supprimerFichierDuBuffer = (index: number) => {
        filesContent.splice(index, 1);
        setFiles([...filesContent])
        console.log("filesContent : ", filesContent)
    }

    const importerFichier = () => {
        console.log("files : ", files)
        clear();
    }

    return (
        <>
            <ListItem key="importerFichier" style={{ cursor: 'pointer' }} onClick={handleOpen}>
                <ListItemIcon>
                    <UploadFileRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Importer un fichier" />
            </ListItem>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography>
                        Importer un fichier
                    </Typography>
                    {files.length > 0 && (
                        <>
                            <List>
                                {files.map((file: any, index: number) => (
                                    <ListItem key={file.index}>
                                        <ListItemText primary={file.name} />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => supprimerFichierDuBuffer(index)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                            <Button onClick={importerFichier}>Importer</Button>
                            <br />
                        </>
                    )}
                    {files.length === 0 && (
                        <>
                            <Button onClick={openFileSelector}>Sélectionner</Button>
                            <br />
                        </>
                    )
                    }
                    <Button onClick={handleClose}>Fermer</Button>
                </Box>
            </Modal>
        </>
    );
};

export default UploadFile;