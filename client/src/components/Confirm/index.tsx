import {useContext, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    useMediaQuery
} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {AuthContext} from "../../App";
import {Logout} from '@mui/icons-material'
import {ConfirmContainer} from "./style";

export default function ConfirmLogout() {
    const [open, setOpen] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const {setUser, setToken, setLocation} = useContext(AuthContext) as any

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);

    };

    const logout = () => {
        setOpen(false);
        setUser(null)
        setToken(null)
        setLocation(null)
    }

    return (
        <ConfirmContainer>
            <Button variant="outlined" onClick={handleClickOpen}>
                Se déconnecter
                <Logout/>
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Voulez vous vraiment vous déconnecter ?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vous allez être déconnecté de votre compte.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button onClick={logout} autoFocus>
                        Confirmer
                    </Button>
                </DialogActions>
            </Dialog>
        </ConfirmContainer>
    );
}