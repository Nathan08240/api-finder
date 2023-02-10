import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemIcon
} from "@mui/material";
import { CircularProgressWithLabel } from '../../components/CircularWithProgression'

const Storage: React.FC = () => {
    return (
        <>
            <ListItem key='Stockage'>
                <ListItemText>Stockage</ListItemText>
                <ListItemIcon>
                    <CircularProgressWithLabel value={72} />
                </ListItemIcon>
            </ListItem>
        </>
    )
}

export default Storage;