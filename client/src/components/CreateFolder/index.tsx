import React, { useState, useContext } from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import { AuthContext } from '../../App'

const apiUrl = 'http://localhost:5000/api/folders'

const CreateFolder: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [folderName, setFolderName] = useState('')
  const { user } = useContext(AuthContext) as any
  const location = `/${user.lastname}_${user.firstname}`

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
  }

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreate = async () => {
    try {
      const url = new URL(apiUrl)
      const response = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ location: location, name: folderName }),
      })

      if (!response.ok) throw new Error(response.statusText)
      return await response.json()

      setOpen(false)
      setFolderName('')
      // refresh the file tree here
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <ListItem
        key='creerDossier'
        style={{ cursor: 'pointer' }}
        onClick={handleClickOpen}
      >
        <ListItemIcon>
          <CreateNewFolderIcon />
        </ListItemIcon>
        <ListItemText>Créer un dossier</ListItemText>
      </ListItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Nouveau dossier</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Nom du dossier'
            type='text'
            fullWidth
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Annuler
          </Button>
          <Button onClick={handleCreate} style={{ color: 'black' }}>
            Créer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateFolder
