import React, {useContext, useState} from 'react'
import {ListItem, ListItemIcon} from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder'
import {AuthContext} from '../../App'

//@ts-ignore
const apiUrl = `${import.meta.env.VITE_API_URL}/api/promotions`;

type CreateFolderProps = {
  activeTab: string
  setActiveTab: (activeTab: string) => void
}

const CreateFolder: React.FC<CreateFolderProps> = ({ activeTab, setActiveTab }) => {
  const [open, setOpen] = useState(false)
  const [folderName, setFolderName] = useState('')
  const { user } = useContext(AuthContext) as any
  const path = window.localStorage.getItem('location')
  const location = path ? path : `/${user?.lastname}_${user?.firstname}`

  let headers = {
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
      await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ location: location, name: folderName }),
      })
      setOpen(false)
      setFolderName('')
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <ListItem
        key='creerDossier'
        style={{ cursor: 'pointer' }}
        disabled={activeTab != 'bibliotheque' ? true : false}
        onClick={() => {
          if (activeTab != 'bibliotheque') {
            return
          } else {
            handleClickOpen()
          }
        }}
      >
        <ListItemIcon>
          <CreateNewFolderIcon />
        </ListItemIcon>
      </ListItem>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
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
