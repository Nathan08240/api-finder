import {Toolbar, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Paper} from "@mui/material";
import {Inbox, Mail} from "@mui/icons-material";
import {FC} from "react";

interface SideBarProps {
    open: boolean,
}
export const Sidebar:FC<SideBarProps>= ({open}) => {

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                },
            }}
        >
            <Toolbar/>
            <Paper sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",

            }}>
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <Inbox/> : <Mail/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
                <Divider/>
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <Inbox/> : <Mail/>}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Drawer>
    );
}