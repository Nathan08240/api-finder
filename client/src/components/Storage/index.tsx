import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemIcon
} from "@mui/material";
import { CircularProgressWithLabel } from '../../components/CircularWithProgression'
import { AuthContext } from '../../App'

interface StorageProps {
    storage: number;
}

const Storage: React.FC<StorageProps> = ({ storage }) => {

    return (
        <>
            <ListItem key='Stockage'>
                <ListItemText>Stockage<br />{storage}Mo / 1Go</ListItemText>
                <ListItemIcon>
                    <CircularProgressWithLabel value={storage / 10} />
                </ListItemIcon>
            </ListItem>
        </>
    )
}

export default Storage;