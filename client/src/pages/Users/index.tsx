import { Container, Table, TableBody, TableRow, TableCell, TableHead, Button, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Delete, ModeEdit } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { makeStyles } from '@mui/styles'

const apiUrl = 'http://localhost:5000/api/users'

interface User {
  id: string
  lastname: string
  firstname: string
  email: string
  role: string
}

const useStyles = makeStyles({
  link: {
    color: 'black',
    textDecoration: 'none',
    margin: '0 auto',
  },
})

export const Users = () => {
  const [usersData, setUsersData] = useState([])
  const classes = useStyles()

  const url = new URL(apiUrl)
  let headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
  }

  useEffect(() => {
    fetch(url, { method: 'GET', headers: headers })
      .then((data) => {
        return data.json()
      })
      .then((resp) => {
        setUsersData(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Container>
      <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h4'>
        Liste des utilisateurs
      </Typography>
      <Link className={classes.link} to='/users/create'>
        <Button color='inherit' variant='contained'>
          Créer un utilisateur
        </Button>
      </Link>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Nom</TableCell>
            <TableCell align='center'>Prénom</TableCell>
            <TableCell align='center'>Email</TableCell>
            <TableCell align='center'>Rôle</TableCell>
            <TableCell align='center'>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usersData &&
            usersData.map((user: User) => (
              <TableRow key={user.id}>
                <TableCell align='center'>{user.lastname}</TableCell>
                <TableCell align='center'>{user.firstname}</TableCell>
                <TableCell align='center'>{user.email}</TableCell>
                <TableCell align='center'>{user.role}</TableCell>
                <TableCell align='center'>
                  <Button color='inherit'>
                    <ModeEdit />
                  </Button>
                  <Button color='primary'>
                    <Delete />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Container>
  )
}
