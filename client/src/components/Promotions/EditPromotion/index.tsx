import { useEffect, useState, FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Container, Typography, TextField, Button, Box, Grid } from '@mui/material'

const apiUrl = 'http://localhost:5000/api/promotions'

const EditPromotion = () => {
  const [id, setId] = useState('')
  const [reference, setReference] = useState('')
  const [name, setName] = useState('')
  // const [referent, setReferent] = useState('')
  const navigate = useNavigate()
  const { _id } = useParams()
  const url = new URL(apiUrl + '/' + _id)
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
        setId(resp._id)
        setReference(resp.reference)
        setName(resp.name)
        // setReferent(resp.referent)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const url = new URL(apiUrl + '/' + _id)
    const promotionData = { reference, name }
    let headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    }

    await fetch(url, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(promotionData),
    })
      .then((res) => {
        alert('Promotion modifiée avec succès')
        navigate('/users')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <Container>
      <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h4'>
        Modifier la promotion
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField disabled fullWidth name='_id' value={id} onChange={(e) => setId(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Référence'
              name='reference'
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              fullWidth
              label='Nom'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <TextField
              fullWidth
              label='Référent'
              name='referent'
              value={referent}
              onChange={(e) => setReferent(e.target.value)}
            />
          </Grid> */}
          <Grid item xs={12}>
            <Box mt={2} style={{ display: 'flex', justifyContent: 'end' }}>
              <Link to='/users' style={{ textDecoration: 'none', color: '#000', marginRight: '10px' }}>
                <Button variant='contained' color='inherit'>
                  Retour
                </Button>
              </Link>
              <Button variant='contained' color='primary' type='submit'>
                Modifier
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default EditPromotion
