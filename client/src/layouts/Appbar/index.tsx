import React, { useState } from 'react'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import { ArrowBack, Delete, DriveFileMoveOutlined, FileDownload, MoreVertRounded, Update } from '@mui/icons-material'
import SearchIcon from '@mui/icons-material/Search'
import MenuIcon from '@mui/icons-material/Menu'
import { Sidebar } from '../Sidebar'
import { Outlet } from 'react-router-dom'
import { alpha, styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

export const AppBarHead = () => {
  const [open, setOpen] = useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const menuOpen = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1, textAlign: 'center' }}></Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Search…' inputProps={{ 'aria-label': 'search' }} />
          </Search>
          <Button
            sx={{
              position: 'absolute',
              left: open ? 0 : '240px',
              transition: 'left 0.2s ease-out',
            }}
            color='inherit'
            onClick={open ? handleDrawerClose : handleDrawerOpen}
          >
            {!open ? <ArrowBack /> : <MenuIcon />}
          </Button>
          <Button
            color='inherit'
            onClick={() => {
              alert('File download')
            }}
            disabled={true}
          >
            <FileDownload />
          </Button>
          <Button
            color='inherit'
            onClick={() => {
              alert('Move folder/file')
            }}
            disabled={true}
          >
            <DriveFileMoveOutlined />
          </Button>
          <Button
            color='inherit'
            onClick={() => {
              alert('Delete')
            }}
            disabled={true}
          >
            <Delete />
          </Button>
          <Button // à voir ce qu'on fait de ce bouton, si on le garde, etc
            color='inherit'
            onClick={() => {
              alert('Rename folder/file')
            }}
          >
            <Update />
          </Button>
          <Button
            color='inherit'
            onClick={() => {
              alert('Options')
            }}
          >
            <MoreVertRounded />
          </Button>
        </Toolbar>
        <Sidebar open={open} />
      </AppBar>
      <div id='detail'>
        <Outlet />
      </div>
    </>
  )
}
