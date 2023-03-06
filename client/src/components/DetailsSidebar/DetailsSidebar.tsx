import React from "react"
import { Table, TableBody, TableCell, TableRow } from "@mui/material"
import Modal from "@mui/material/Modal"
import CloseIcon from "@mui/icons-material/Close"
import DownloadIcon from "@mui/icons-material/Download"
import DeleteIcon from "@mui/icons-material/Delete"
import Box from "@mui/material/Box"
import { makeStyles } from "@mui/styles"

interface DetailsSidebarProps {
  selectedContent: {
    name: string
    size: number
    type: string
    path: string
    extension?: string
    modifiedAt: string
  }
  setShowSidebar: (show: boolean) => void
}

const useStyles = makeStyles({
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    cursor: "pointer",
    margin: "5px",
  },
  fileName: {
    fontSize: "2rem",
    textAlign: "center",
    margin: "20px 10px",
  },
  table: {
    border: "none",
    "& td": {
      border: "none",
    },
  },
})

const DetailsSidebar: React.FC<DetailsSidebarProps> = ({ selectedContent, setShowSidebar }) => {
  const classes = useStyles()

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("authToken"),
  }

  const path = selectedContent?.path
  const pathArray = path?.split("/")

  const updatedPath = `${pathArray?.slice(2, pathArray.length - 1).join("/")}/`

  const size = Math.floor(selectedContent?.size) + "KB"

  const details = [
    { label: "Format", value: selectedContent?.extension?.toUpperCase() },
    { label: "Taille", value: size },
    {
      label: "Modifié",
      value: new Date(selectedContent?.modifiedAt).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    },
    {
      label: "Emplacement",
      value: updatedPath,
    },
  ]

  console.log(path)

  const apiUrl = `http://localhost:5000/api/files/${selectedContent?.name}?target=${path}`

  const handleDownload = async () => {
    const url = new URL(apiUrl)
    try {
      await fetch(url, {
        method: "GET",
        headers: headers,
      })
        .then((res) => res.blob())
        .then((blob) => {
          const url = window.URL.createObjectURL(new Blob([blob]))
          const link = document.createElement("a")
          link.href = url
          link.setAttribute("download", selectedContent?.name)
          document.body.appendChild(link)
          link.click()
          link.parentNode?.removeChild(link)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = () => {
    const url = new URL(apiUrl)
    try {
      fetch(url, {
        method: "DELETE",
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
        })
    } catch (error) {
      console.log(error)
    }
  }

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
  }

  return (
    <Modal open={setShowSidebar}>
      <Box sx={style}>
        <div className={classes.buttonContainer}>
          <div>
            <DownloadIcon onClick={handleDownload} className={classes.button} />
            <DeleteIcon onClick={handleDelete} className={classes.button} />
          </div>
          <CloseIcon onClick={() => setShowSidebar(false)} className={classes.button} />
        </div>
        <div className={classes.fileName}>{selectedContent?.name}</div>
        <Table className={classes.table}>
          <TableBody>
            {details.map(({ label, value }) => (
              <TableRow key={label}>
                <TableCell>{label}:</TableCell>
                <TableCell>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Modal>
  )
}

export default DetailsSidebar
