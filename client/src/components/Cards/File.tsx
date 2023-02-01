import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import Grid from '@mui/material/Grid'

import Sidebar from '../../components/DetailsSidebar/DetailsSidebar'
import { ClassNames } from '@emotion/react'

const apiUrl = 'http://localhost:5000/api/files'

interface File {
  id: string
  name: string
  type: 'file'
  path: string
  size: number
  extension: string
  modifiedAt: Date
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

const FileCard: React.FC<{ file: File; onClick: (file: File) => void }> = ({ file, onClick }) => {
  const classes = useStyles()
  const Icon = InsertDriveFileIcon

  return (
    <Card className={classes.root} onClick={() => onClick(file)}>
      <CardMedia
        className={classes.media}
        image={`https://via.placeholder.com/300x200/555555/ffffff?text=File`}
        title={file.name}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='h2'>
          {file.name}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {file.size}KB
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {new Date(file!.modifiedAt).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          {file.extension.toUpperCase()}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          <Icon fontSize='large' />
        </Typography>
      </CardContent>
    </Card>
  )
}

const FilesDisplay: React.FC<{ location: string }> = (location) => {
  const [files, setFiles] = useState<File[]>([])
  const [showSidebar, setShowSidebar] = useState<boolean>(false)
  const [showFileSidebar, setShowFileSidebar] = useState<File | undefined>(undefined)
  const [path] = useState<string>(location.location)

  const fetchFiles = async (path: string = location.location) => {
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
    fetchFiles(path).then((data) => {
      setFiles(
        data.files.map((file: any) => ({
          id: file.id,
          name: file.name,
          type: file.type,
          path: file.path,
          size: file.size,
          extension: file.extension,
          modifiedAt: file.modifiedAt,
        }))
      )
    })
  }, [path])

  const handleFileClick = (file: File) => {
    const handleClick = (event: any) => {
      switch (event.detail) {
        case 1: {
          setShowSidebar(true)
          setShowFileSidebar(file)
          break
        }
        case 2: {
          console.log('voir le fichier')
          break
        }
        default: {
          break
        }
      }
    }
    handleClick(event)
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={10}>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '75px' }}>
          {files.map((file) => (
            <FileCard key={file.id} file={file} onClick={() => handleFileClick(file)} />
          ))}
        </div>
      </Grid>
      <Grid item xs={2}>
        {showSidebar && (
          <Sidebar
            // @ts-ignore
            selectedContent={showFileSidebar}
            setShowSidebar={setShowSidebar}
          />
        )}
      </Grid>
    </Grid>
  )
}

export default FilesDisplay
