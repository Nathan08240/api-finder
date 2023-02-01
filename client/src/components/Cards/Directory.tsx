import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import FolderIcon from '@mui/icons-material/Folder'
import { BackButton } from './style'
import { AuthContext } from '../../App'

const apiUrl = 'http://localhost:5000/api/folders'

interface Directory {
  id: string
  path: string
  name: string
  type: 'directory'
  size: number
  modifiedAt: string
  children?: File[] | Directory[]
}

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    margin: '10px',
    display: 'inline-block',
    cursor: 'pointer',
  },
  media: {
    height: 140,
  },
})

const DirectoryCard: React.FC<{
  directory: Directory
  onClick: (directory: Directory) => void
}> = ({ directory, onClick }) => {
  const classes = useStyles()
  const Icon = FolderIcon

  return (
    <Card className={classes.root} onClick={() => onClick(directory)}>
      <CardMedia
        className={classes.media}
        image={`https://via.placeholder.com/300x200/000000/fbe026?text=Folder`}
        title={directory.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          {directory.name}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          <Icon fontSize='large' />
        </Typography>
      </CardContent>
    </Card>
  )
}

const DirectoriesDisplay: React.FC<{ location: string }> = (location) => {
  const [directories, setDirectories] = useState<Directory[]>([])
  const { user, setLocation } = useContext(AuthContext) as any
  const [path, setPath] = useState<string>(location.location)

  const fetchDirectories = async (path: string = location.location) => {
    while (!localStorage.getItem('authToken') && !location.location) {
      await new Promise((resolve) => setTimeout(resolve, 50))
    }

    let headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    }

    const url = new URL(apiUrl)
    url.searchParams.set('path', path)
    const result = await fetch(url.href, { method: 'GET', headers: headers })
    return await result.json()
  }

  useEffect(() => {
    if (!localStorage.getItem('authToken')) return
    fetchDirectories(path).then((data) => {
      setDirectories(
        data.directories.map((directory: any) => ({
          id: directory.id,
          path: directory.path,
          name: directory.name,
          type: directory.type,
          size: directory.size,
          modifiedAt: directory.modifiedAt,
          children: directory.children,
        }))
      )
    })
  }, [path])

  const handleDirectoryClick = (directory: Directory) => {
    setLocation(directory.path)
    setPath(directory.path)
  }

  const handleBackButton = () => {
    if (path === `/${user.lastname}_${user.firstname}`) return
    setPath(path.substring(0, path.lastIndexOf('/')))
    setLocation(path.substring(0, path.lastIndexOf('/')))
  }

  return (
    <>
      <BackButton onClick={handleBackButton} disabled={path === '/'}>
        Retour
      </BackButton>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '75px' }}>
        {directories.map((directory) => (
          <DirectoryCard key={directory.id} directory={directory} onClick={() => handleDirectoryClick(directory)} />
        ))}
      </div>
    </>
  )
}

export default DirectoriesDisplay
