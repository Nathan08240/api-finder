import {useContext, useRef} from "react";
import {AuthContext} from "../../App";
import * as MUI from "@mui/material";

export const Settings = () => {
    const {counter, setCounter, storagePath, setStoragePath} = useContext(AuthContext);
    const inputRef = useRef<any>(null);
    const handleFolderSelection = (event: React.ChangeEvent<any>) => {
        setStoragePath(event.target.files?.[0]?.name);
        setCounter(counter + 1);
    }

    const openFolderSelectionDialog = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    return (
        <>
            <MUI.Box sx={{display: 'flex',flexDirection :'column', alignItems: 'center', marginTop: '10px'}}>
                <MUI.Button variant="contained" onClick={openFolderSelectionDialog}>Sélectionner un dossier de destination</MUI.Button>
                <input
                    ref={inputRef}
                    type="file"
                    onChange={handleFolderSelection}
                    style={{display: 'none'}}
                />
                {storagePath && <p>Vous avez sélectionné le dossier : {storagePath}</p>}
            </MUI.Box>

        {/*    Bouton pour synchorniser manuellement les donners sur le fichier de destinations*/}
            <MUI.Box sx={{display: 'flex',flexDirection :'column', alignItems: 'center', marginTop: '10px'}}>
                <MUI.Button variant="contained" onClick={() => setCounter(counter + 1)}>Synchroniser</MUI.Button>
            </MUI.Box>






        </>
    );
}