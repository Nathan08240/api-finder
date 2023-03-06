import React from 'react'
import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CropIcon from '@mui/icons-material/Crop'
import { makeStyles } from '@mui/styles'

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
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  sidebarButton: {
    border: 'none',
    background: 'white',
    width: '50px',
  },
  fileName: {
    fontSize: '2rem',
    textAlign: 'center',
    margin: '20px 10px',
  },
  table: {
    border: 'none',
    '& td': {
      border: 'none',
    },
  },
})

const DetailsSidebar: React.FC<DetailsSidebarProps> = ({ selectedContent, setShowSidebar }) => {
  const classes = useStyles()

  const path = selectedContent?.path
  const pathArray = path?.split('/')
  const updatedPath = `.../${pathArray?.slice(2, pathArray.length - 1).join('/')}/`

  const size = Math.floor(selectedContent?.size) + 'KB'

  const details = [
    { label: 'Format', value: selectedContent?.extension?.toUpperCase() },
    { label: 'Taille', value: size },
    {
      label: 'Modifié',
      value: new Date(selectedContent?.modifiedAt).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
    },
    {
      label: 'Emplacement',
      value: updatedPath,
    },
  ]

  return (
    <div
      style={{
        position: 'absolute',
        top: '80px',
        right: '0px',
        width: '300px',
        height: '100%',
        wordWrap: 'break-word',
      }}
    >
      <div className={classes.buttonsContainer}>
        <button className={classes.sidebarButton}>
          <CropIcon fontSize='large' style={{ cursor: 'pointer' }} />
        </button>
        <button className={classes.sidebarButton} onClick={() => setShowSidebar(false)}>
          <CancelOutlinedIcon fontSize='large' style={{ cursor: 'pointer' }} />
        </button>
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
    </div>
  )
}

export default DetailsSidebar
