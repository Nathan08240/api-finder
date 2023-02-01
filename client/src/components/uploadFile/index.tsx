import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


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

const UploadFile: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [alertOpen, setAlertOpen] = React.useState(false);
    const handleAlertOpen = () => setAlertOpen(true);
    const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertOpen(false);
    };


    const [file, setFile] = React.useState<any>(undefined);

    const handleInput = (e: any) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0]);
    };

    const { user } = React.useContext(AuthContext) as any
    const target = `/${user.lastname}_${user.firstname}/`
    const apiUrl = `http://localhost:5000/api/files?target=${target}`

    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    }

    const retirerFichier = () => {
        setFile(undefined);
        console.log("file : ", file)
    }

    const importerFichier = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", headers.Authorization);
        console.log("myHeaders : ", myHeaders);

        var formdata = new FormData();
        formdata.append("file", file, file.name);

        var requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(apiUrl, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


        handleClose();
        handleAlertOpen();
        setFile(undefined);

    }

    const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
        props,
        ref,
    ) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

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
                    {file && (
                        <>
                            <List>
                                <ListItem >
                                    <ListItemText primary={file.name} />
                                    <ListItemSecondaryAction>
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
                                            onClick={() => retirerFichier()}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            </List>
                            <Button onClick={importerFichier}>Importer</Button>
                            <br />
                        </>
                    )}
                    {!file && (
                        <>
                            <input type="file" onChange={handleInput} />
                            <br />
                        </>
                    )
                    }
                    <Button onClick={handleClose}>Fermer</Button>
                </Box>
            </Modal>
            <Snackbar open={alertOpen} anchorOrigin={{vertical: "bottom", horizontal: "right"}} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                    Fichier importé avec succès !
                </Alert>
            </Snackbar>
        </>
    );
};

export default UploadFile;