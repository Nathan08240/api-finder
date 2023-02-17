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

    const progressStyle = (value: number) => {
        if (value < 700) {
            return {
                color: 'green',
            }
        } else if (value < 850) {
            return {
                color: 'orange',
            }
        } else {
            return {
                color: 'red',
            }
        }
    }
    return (
        <>
            <ListItem key='Stockage'>
                <ListItemText>Stockage<br />{storage}Mo / 1Go</ListItemText>
                <ListItemIcon>
                    <CircularProgressWithLabel value={storage / 10} sx={{ color: progressStyle(storage) }} />
                </ListItemIcon>
            </ListItem>
        </>
    )
}

export default Storage;