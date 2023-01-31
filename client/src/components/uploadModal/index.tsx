import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
                    <Button onClick={() => alert("sélection d'un fichier")}>Sélectionner un fichier</Button>
                    <Button onClick={props.handleClose}>Fermer</Button>
                </Box>
            </Modal>
        </>
    )
}