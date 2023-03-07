import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'

const apiUrl = 'http://localhost:5000/api/users'
const apiPromotionsUrl = 'http://localhost:5000/api/promotions'

interface User {
  _id: string
  lastname: string
  firstname: string
  email: string
  role: string
  promotion: string
  name: string
}

interface Promotion {
  _id: string
  name: string
}

const UserDetails = () => {
  const { _id } = useParams()
  const url = new URL(apiUrl + '/' + _id)
  let headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
  }

  const [userData, setUserData] = useState<User>({
    _id: '',
    lastname: '',
    firstname: '',
    email: '',
    role: '',
    promotion: '',
    name: '',
  })
  const [promotionsData, setPromotionsData] = useState<Promotion>({
    _id: '',
    name: '',
  })

  useEffect(() => {
    fetch(url, { method: 'GET', headers: headers })
      .then((data) => {
        return data.json()
      })
      .then((resp) => {
        setUserData(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    if (userData.promotion) {
      const promotionUrl = new URL(apiPromotionsUrl + '/' + userData.promotion)
      fetch(promotionUrl, { method: 'GET', headers: headers })
        .then((data) => {
          return data.json()
        })
        .then((resp) => {
          setPromotionsData(resp)
          setUserData((prevState) => ({
            ...prevState,
            name: resp.name,
          }))
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [userData.promotion])

  return (
    <Container>
      {userData && (
        <div>
          <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h4'>
            Détail de l'utilisateur
          </Typography>
          <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h6'>
            Id: {userData._id}
          </Typography>
          <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h6'>
            Nom: {userData.lastname}
          </Typography>
          <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h6'>
            Prénom: {userData.firstname}
          </Typography>
          <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h6'>
            Email: {userData.email}
          </Typography>
          <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h6'>
            Role: {userData.role}
          </Typography>
          <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h6'>
            Promotion: {userData.name}
          </Typography>
        </div>
      )}
      <Link
        to='/users'
        style={{
          display: 'flex',
          justifyContent: 'center',
          textDecoration: 'none',
          color: '#000',
          marginRight: '10px',
        }}
      >
        <Button variant='contained' color='inherit'>
          Retour
        </Button>
      </Link>
    </Container>
  )
}

export default UserDetails
