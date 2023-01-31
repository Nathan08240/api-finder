import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useFilePicker } from 'use-file-picker';
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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

export default function UploadModal(props: UploadModalProps) {
    const [files, setFiles] = React.useState<any>([]);
    const [openFileSelector, { filesContent, loading, errors, clear }] = useFilePicker({
        multiple: true,
    });

    const supprimerFichierDuBuffer = (index: number) => {
        filesContent.splice(index, 1);
        setFiles([...filesContent])
        console.log("filesContent : ", filesContent)
    }

    const importerFichier = () => {
        console.log("files : ", files)
        clear();
    }

    React.useEffect(() => {
        setFiles([...filesContent])
    }, [filesContent])

    return (
        <>
            <Modal
                open={props.open}
                onClose={props.handleClose}
            >
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


                    <Button onClick={props.handleClose}>Fermer</Button>
                </Box>
            </Modal>
        </>
    )
}