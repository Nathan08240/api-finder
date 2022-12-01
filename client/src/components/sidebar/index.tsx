import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Paper, Typography } from "@mui/material";
import { CreateNewFolder, DriveFolderUploadRounded, UploadFileRounded, DriveFileMoveOutlined } from "@mui/icons-material";
import { FC } from "react";

interface SideBarProps {
    open: boolean,
}
export const Sidebar: FC<SideBarProps> = ({ open }) => {

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={!open}
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
                zIndex: 2,
            }}
        >
            <Typography variant="h5" sx={{ p: 2, textAlign:'center' }}>
                Get Dropped
            </Typography>
            <Divider />
            <Paper sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",

            }}>

                <List>
                    <ListItem button key="Créer un dossier">
                        <ListItemIcon><CreateNewFolder /></ListItemIcon>
                        <ListItemText>Créer un dossier</ListItemText>
                    </ListItem>
                    <ListItem button key="Importer un dossier">
                        <ListItemIcon><DriveFolderUploadRounded /></ListItemIcon>
                        <ListItemText>Importer un dossier</ListItemText>
                    </ListItem>
                    <ListItem button key="Importer un fichier">
                        <ListItemIcon><UploadFileRounded /></ListItemIcon>
                        <ListItemText>Importer un fichier</ListItemText>
                    </ListItem>
                    <ListItem button key="Déplacer">
                        <ListItemIcon><DriveFileMoveOutlined /></ListItemIcon>
                        <ListItemText>Déplacer</ListItemText>
                    </ListItem>
                    {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <Inbox /> : <Mail />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))} */}
                </List>
                {/* <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <Inbox /> : <Mail />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List> */}
            </Paper>
        </Drawer>
    );
}