import {Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Typography,} from '@mui/material'
import {DriveFileMoveOutlined, Logout} from '@mui/icons-material'
import CircularProgress, {CircularProgressProps,} from '@mui/material/CircularProgress'
import {FC} from 'react'

interface SideBarProps {
  open: boolean
}

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number }
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant='determinate' {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='caption'
          component='div'
          color='text.secondary'
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  )
}

export const Sidebar: FC<SideBarProps> = ({ open }) => {
  return (
    <Drawer
      variant='persistent'
      anchor='left'
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
      <Typography variant='h5' sx={{ p: 2, textAlign: 'center' }}>
        Get Dropped
      </Typography>
      <Divider />
      <Paper
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <List>
          <ListItem key='Stockage'>
            <ListItemText>Stockage</ListItemText>
            <ListItemIcon>
              <CircularProgressWithLabel value={72} />
            </ListItemIcon>
          </ListItem>
          <Divider />
          <ListItem key='Utilisateur'>
            <ListItemText>Connecté :</ListItemText>
          </ListItem>
          <ListItemText sx={{paddingLeft: 2}}>John Doe</ListItemText>
          <ListItemText sx={{paddingLeft: 2}}>john.doe@viacesi.fr</ListItemText>
          <ListItemText sx={{paddingLeft: 2}}>Etudiant</ListItemText>
          <ListItem button key='Déconnexion'>
            <ListItemText>Déconnexion</ListItemText>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
          </ListItem>
          <Divider />
          <ListItem button key='Déplacer'>
            <ListItemIcon>
              <DriveFileMoveOutlined />
            </ListItemIcon>
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
      </Paper>
    </Drawer>
  )
}
