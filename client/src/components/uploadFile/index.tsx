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
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import { AuthContext } from '../../App'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import UploadIcon from '@mui/icons-material/Upload';


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


    const [files, setFiles] = React.useState<any>(undefined);

    const handleInput = (e: any) => {
        console.log(e.target.files)
        setFiles(e.target.files);
    };

    const { user } = React.useContext(AuthContext) as any
    const target = `/${user.lastname}_${user.firstname}/`
    const apiUrl = `http://localhost:5000/api/files?target=${target}`

    const headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    }

    const retirerFichier = (index: any) => {
        setFiles(undefined);
        console.log("files : ", files)
    }

    const importerFichier = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", headers.Authorization);
        console.log("myHeaders : ", myHeaders);

        var formdata = new FormData();

        if (files.length == 1) {
            console.log("files : ", files)
            formdata.append("file", files[0], files[0].name);
        }
        if (files.length > 1) {
            for (let i = 0; i < files.length; i++) {
                formdata.append("file", files[i], files[i].name);
            }
        }

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
        setFiles(undefined);

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
                    {files && (
                        <>
                            <List>
                                {files.length == 1 && (
                                    <ListItem >
                                        <ListItemText primary={files[0].name} />
                                        <ListItemSecondaryAction>
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => retirerFichier(0)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )}
                                {files.length > 1 && 
                                <Typography>TO FIX : map des fichiers sélectionnés.</Typography>
                                // files.map((file: any, index: any) => (
                                //     <ListItem >
                                //         <ListItemText primary={file.name} />
                                //         <ListItemSecondaryAction>
                                //             <IconButton

                                //                 edge="end"
                                //                 aria-label="delete"
                                //                 onClick={() => retirerFichier(index)}
                                //             >
                                //                 <DeleteIcon />
                                //             </IconButton>
                                //         </ListItemSecondaryAction>
                                //     </ListItem>
                                // ))
                                }
                            </List>
                            <Button variant='contained' onClick={importerFichier} startIcon={<UploadIcon />}>Importer</Button>
                            <br />
                        </>
                    )}
                    {!files && (
                        <>
                            <br />
                            <label htmlFor='upload-file'>
                                <input style={{ display: "none" }} type="file" multiple id="upload-file" name="upload-file" onChange={handleInput} />
                                <Button variant='outlined' component='span'>Séléctionner</Button>
                            </label>
                            <br />
                        </>
                    )
                    }
                    <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} sx={{ position: "absolute", top: "0", right: "0" }} />
                    {/* <Button onClick={handleClose}>Fermer</Button> */}
                </Box>
            </Modal>
            <Snackbar open={alertOpen} anchorOrigin={{ vertical: "bottom", horizontal: "right" }} autoHideDuration={6000} onClose={handleAlertClose}>
                <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
                    Fichier importé avec succès !
                </Alert>
            </Snackbar>
        </>
    );
};

export default UploadFile;