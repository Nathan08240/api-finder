import React, { useContext, useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile'
import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import { AuthContext } from '../../App'

const apiUrl = 'http://localhost:5000/api/files'

interface File {
  id: string
  name: string
  type: 'file'
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

const FileCard: React.FC<{ file: File; onClick: (file: File) => void }> = ({
  file,
  onClick,
}) => {
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
          <Icon fontSize='large' />
        </Typography>
      </CardContent>
    </Card>
  )
}

const FilesDisplay: React.FC = () => {
  const [files, setFiles] = useState<File[]>([])
  const [path] = useState<string>('')

  const { user } = useContext(AuthContext) as any

  const fetchFiles = async (path: string) => {
    path = `/${user.lastname}_${user.firstname}`
    while (!localStorage.getItem('authToken')) {
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
        }))
      )
      console.log(data)
    })
  }, [path])

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '75px' }}>
      {files.map((file) => (
        <FileCard key={file.id} file={file} onClick={() => void 0} />
      ))}
    </div>
  )
}

export default FilesDisplay
