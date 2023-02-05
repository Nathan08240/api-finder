import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Table, TableBody, TableRow, TableCell, TableHead, Button, Typography } from '@mui/material'
import { Delete, ModeEdit, VisibilityOutlined } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'

const apiUrl = 'http://localhost:5000/api/users'

interface User {
  _id: string
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
  const [usersData, setUsersData] = useState<User[]>([])
  const classes = useStyles()
  const navigate = useNavigate()
  const url = new URL(apiUrl)
  let headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
  }

  const loadDetails = (_id: string) => {
    navigate(`details/${_id}`)
  }

  const loadEdit = (_id: string) => {
    navigate(`edit/${_id}`)
  }

  const RemoveFunction = (_id: string) => {
    if (window.confirm('Voulez-vous supprimer cet utilisateur ?')) {
      const url = new URL(apiUrl + '/' + _id)
      let headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
      }
      fetch(url, { method: 'DELETE', headers: headers })
        .then((data) => {
          return data.json()
        })
        .then((resp) => {
          console.log(resp)
          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
        })
    }
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
              <TableRow key={user._id}>
                <TableCell align='center'>{user.lastname}</TableCell>
                <TableCell align='center'>{user.firstname}</TableCell>
                <TableCell align='center'>{user.email}</TableCell>
                <TableCell align='center'>{user.role}</TableCell>
                <TableCell align='center'>
                  <Button
                    color='inherit'
                    onClick={() => {
                      loadDetails(user._id)
                    }}
                  >
                    <VisibilityOutlined />
                  </Button>
                  <Button
                    color='inherit'
                    onClick={() => {
                      loadEdit(user._id)
                    }}
                  >
                    <ModeEdit />
                  </Button>
                  <Button
                    color='primary'
                    onClick={() => {
                      RemoveFunction(user._id)
                    }}
                  >
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
