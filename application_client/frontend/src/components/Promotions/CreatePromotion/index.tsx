import { useState, FormEvent, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from '@mui/material'
//@ts-ignore
const apiUrl = `${import.meta.env.VITE_API_URL}/api/promotions`;
//@ts-ignore
const apiUsersUrl = `${import.meta.env.VITE_API_URL}/api/users`;

interface User {
  _id: string
  firstname: string
  lastname: string
  role: string
}

const CreatePromotion = () => {
  const [id, setId] = useState('')
  const [reference, setReference] = useState('')
  const [name, setName] = useState('')
  const [referent, setReferent] = useState('')
  const [pilot, setPilot] = useState<User[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPilots = async () => {
      let headers = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('authToken'),
      }
      await fetch(apiUsersUrl, { method: 'GET', headers: headers })
        .then((res) => res.json())
        .then((data) => {
          const pilots = data.filter((user: User) => user.role === 'pilot')
          setPilot(pilots)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    fetchPilots()
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const url = new URL(apiUrl)
    const promotionData = { reference, name, referent }
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    }
    await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(promotionData),
    })
      .then((res) => {
        alert('Promotion créée avec succès')
        navigate('/promotions')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <Container>
      <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h4'>
        Ajouter une promotion
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField disabled autoFocus fullWidth label='Id' name='_id' onChange={(e) => setId(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              fullWidth
              label='Référence'
              name='referennce'
              onChange={(e) => setReference(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label='Nom' name='name' onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor='pilot-select'>Référant</InputLabel>
              <Select
                onChange={(e: SelectChangeEvent<string>) => setReferent(e.target.value)}
                inputProps={{
                  name: 'referent',
                  id: 'pilot-select',
                }}
              >
                {pilot &&
                  pilot.map((pilot: User) => (
                    <MenuItem key={pilot._id} value={pilot._id}>
                      {pilot.firstname + ' ' + pilot.lastname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2} style={{ display: 'flex', justifyContent: 'end' }}>
              <Link to='/promotions' style={{ textDecoration: 'none', color: '#000', marginRight: '10px' }}>
                <Button variant='contained' color='inherit'>
                  Retour
                </Button>
              </Link>
              <Button variant='contained' color='primary' type='submit'>
                Ajouter
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  )
}

export default CreatePromotion
