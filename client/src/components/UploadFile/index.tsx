import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded'
import { AuthContext } from '../../App'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import UploadIcon from '@mui/icons-material/Upload'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type UploadFileProps = {
  activeTab: string
  setActiveTab: (activeTab: string) => void
}

const UploadFile: React.FC<UploadFileProps> = ({ activeTab, setActiveTab }) => {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [alertOpen, setAlertOpen] = React.useState(false)
  const handleAlertOpen = () => setAlertOpen(true)
  const handleAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setAlertOpen(false)
  }

  const [fileTooLargeAlert, setFileTooLargeAlert] = React.useState(false)
  const handleFileTooLargeAlertOpen = () => setFileTooLargeAlert(true)
  const handleFileTooLargeAlertClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return
    }
    setFileTooLargeAlert(false)
  }

  const [filesArray, setFilesArray] = React.useState<any>([])
  const getFilesArray = () => {
    return filesArray
  }

  const handleInput = async (e: any) => {
    console.log('e.target.files : ', e.target.files)
    await setFilesArray(Array.from(e.target.files))
    console.log('filesArray : ', filesArray)
  }

  const { user } = React.useContext(AuthContext) as any
  const target = `/${user.lastname}_${user.firstname}/`
  const apiUrl = `http://localhost:5000/api/files?target=${target}`

  const path = window.localStorage.getItem('location')
  const uploadTarget = path ? path : `/${user?.lastname}_${user?.firstname}`
  const apiUploadUrl = `http://localhost:5000/api/files?target=${uploadTarget}`

  const headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
  }

  const retirerFichier = (index: any) => {
    setFilesArray(filesArray.filter((file: any, i: any) => i !== index))
    console.log('filesArray : ', filesArray)
  }

  const importerFichier = async () => {
    var myHeaders = new Headers()
    myHeaders.append('Authorization', headers.Authorization)
    console.log('myHeaders : ', myHeaders)

    var formdata = new FormData()

    if (filesArray?.length == 1) {
      console.log('filesArray : ', filesArray)
      formdata.append('file', filesArray[0], filesArray[0].name)
    }
    if (filesArray?.length > 1) {
      for (let i = 0; i < filesArray.length; i++) {
        formdata.append('file', filesArray[i], filesArray[i].name)
      }
    }

    var requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    }

    fetch(apiUploadUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error))

    handleClose()
    handleAlertOpen()
    setFilesArray([])
  }

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
  })

  const DisplayList: React.FunctionComponent<{}> = () => {
    return (
      <>
        {console.log('filesArray : ', filesArray)}
        {filesArray.map((file: any, index: any) => {
          if (file.size > 5000000) {
            retirerFichier(index)
            setFileTooLargeAlert(true)
          }
        })}
        {filesArray.map((file: any, index: any) => {
          return (
            <ListItem key={index}>
              <ListItemText
                primary={
                  file.name.length > 30
                    ? file.name.substring(0, 12) +
                      '(...)' +
                      file.name.substring(file.name.length - 12, file.name.length)
                    : file.name
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge='end' aria-label='delete' onClick={() => retirerFichier(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
      </>
    )
  }

  return (
    <>
      <ListItem
        key='importerFichier'
        style={{ cursor: 'pointer' }}
        disabled={activeTab != 'bibliotheque' ? true : false}
        onClick={() => {
          if (activeTab != 'bibliotheque') {
            return
          } else {
            handleOpen()
          }
        }}
      >
        <ListItemIcon>
          <UploadFileRoundedIcon />
        </ListItemIcon>
        <ListItemText primary='Importer un fichier' />
      </ListItem>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography>Importer un fichier</Typography>
          {filesArray.length > 0 && (
            <>
              <List>
                <DisplayList />
              </List>
              <Button variant='contained' onClick={importerFichier} startIcon={<UploadIcon />}>
                Importer
              </Button>
              <br />
            </>
          )}
          {filesArray.length == 0 && (
            <>
              <br />
              <label htmlFor='upload-file'>
                <input
                  style={{ display: 'none' }}
                  type='file'
                  multiple
                  id='upload-file'
                  name='upload-file'
                  onChange={handleInput}
                />
                <Button variant='outlined' component='span'>
                  Séléctionner
                </Button>
              </label>
              <br />
            </>
          )}
          <CloseIcon
            onClick={handleClose}
            style={{ cursor: 'pointer' }}
            sx={{ position: 'absolute', top: '0', right: '0' }}
          />
          <Snackbar
            open={fileTooLargeAlert}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={6000}
            onClose={handleFileTooLargeAlertClose}
          >
            <Alert onClose={handleFileTooLargeAlertClose} severity='error' sx={{ width: '100%' }}>
              Fichier trop volumineux (5Mo maximum)
            </Alert>
          </Snackbar>
        </Box>
      </Modal>
      <Snackbar
        open={alertOpen}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity='success' sx={{ width: '100%' }}>
          Fichier importé avec succès !
        </Alert>
      </Snackbar>
    </>
  )
}

export default UploadFile
