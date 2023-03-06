import React, { useEffect, useState } from "react"
import { makeStyles } from "@mui/styles"
import { Card, CardContent, Typography } from "@mui/material"
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"
import ImageIcon from "@mui/icons-material/Image"
import DescriptionIcon from "@mui/icons-material/Description"
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf"
import MovieIcon from "@mui/icons-material/Movie"
import GifBoxIcon from "@mui/icons-material/GifBox"
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic"
import Grid from "@mui/material/Grid"
import Sidebar from "../../components/DetailsSidebar/DetailsSidebar"

interface File {
  id: string
  name: string
  type: "file"
  path: string
  size: number
  extension: string
  modifiedAt: Date
}

const useStyles = makeStyles({
  root: {
    width: "200px",
    display: "inline-block",
    cursor: "pointer",
    borderRadius: "10px",
    padding: "0",
    border: "1px solid #a6a6a6",
  },
  CardContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
  },
})

const FileCard: React.FC<{ file: File; onClick: (file: File) => void;}> = ({
  file,
  onClick,
}) => {
  const classes = useStyles()
  let Icon = InsertDriveFileIcon
  const fileName = file.name
  const fileExtension = file.extension
  const nameWithoutExtension = fileName.split(".").slice(0, -1).join(".")
  const limitedName =
    nameWithoutExtension.length > 30 ? nameWithoutExtension.slice(0, 15) + "..." : nameWithoutExtension

  switch (fileExtension) {
    case "pdf":
      Icon = PictureAsPdfIcon
      break
    case "docx":
      Icon = DescriptionIcon
      break
    case "xlsx":
      Icon = DescriptionIcon
      break
    case "pptx":
      Icon = DescriptionIcon
      break
    case "txt":
      Icon = DescriptionIcon
      break
    case "jpg":
      Icon = ImageIcon
      break
    case "png":
      Icon = ImageIcon
      break
    case "jpeg":
      Icon = ImageIcon
      break
    case "gif":
      Icon = GifBoxIcon
      break
    case "mp4":
      Icon = MovieIcon
      break
    case "mp3":
      Icon = LibraryMusicIcon
      break
    default:
      Icon = InsertDriveFileIcon
  }

  return (
    <Card
      className={classes.root}
      onClick={() => {
        onClick(file)
      }}
    >
      <CardContent className={classes.CardContainer}>
        <Typography variant='body2' color='textSecondary' component='p'>
          <Icon sx={{ fontSize: 100 }} />
        </Typography>
        <Typography variant='h6' component='h2'>
          {limitedName}
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
    while (!localStorage.getItem("authToken") && !location.location) {
      await new Promise((resolve) => setTimeout(resolve, 50))
    }

    const apiUrl = "http://localhost:5000/api/files"

    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    }

    const url = new URL(apiUrl)
    url.searchParams.set("path", path)
    const result = await fetch(url.href, { method: "GET", headers: headers })
    return await result.json()
  }

  useEffect(() => {
    if (!localStorage.getItem("authToken")) return
    fetchFiles(path).then((data) => {
      setFiles(
        data.files.map((file: File) => ({
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
    setShowSidebar(true)
    setShowFileSidebar(file)
  }

  return (
    <Grid container>
      <Grid container>
        {files.map((file) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={2}
            key={file.id}
            sx={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}
          >
            <FileCard file={file} onClick={() => handleFileClick(file)} />
          </Grid>
        ))}
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
