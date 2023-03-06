import { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button,
  Box,
  Grid,
} from '@mui/material'

const apiUrl = 'http://localhost:5000/api/users'

const roles = [
  { value: 'support', label: 'Support' },
  { value: 'administration', label: 'Administration' },
  { value: 'pilot', label: 'Pilote' },
  { value: 'speaker', label: 'Intervenant' },
  { value: 'student', label: 'Etudiant' },
]

const CreateUser = () => {
  const [id, setId] = useState('')
  const [lastname, setLastname] = useState('')
  const [firstname, setFirstname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const url = new URL(apiUrl)
    const userData = { lastname, firstname, email, password, role }
    const headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    }

    await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(userData),
    })
      .then((res) => {
        alert('Utilisateur créé avec succès')
        navigate('/users')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return (
    <Container>
      <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h4'>
        Ajouter un utilisateur
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField disabled autoFocus fullWidth label='Id' name='_id' onChange={(e) => setId(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField autoFocus fullWidth label='Nom' name='lastname' onChange={(e) => setLastname(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label='Prénom' name='firstname' onChange={(e) => setFirstname(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label='Email' name='email' onChange={(e) => setEmail(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label='Mot de passe'
              type='password'
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor='role-select'>Rôle</InputLabel>
              <Select
                onChange={(e: SelectChangeEvent<string>) => setRole(e.target.value)}
                inputProps={{
                  name: 'role',
                  id: 'role-select',
                }}
              >
                {roles.map((role, index) => (
                  <MenuItem key={index} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2} style={{ display: 'flex', justifyContent: 'end' }}>
              <Link to='/users' style={{ textDecoration: 'none', color: '#000', marginRight: '10px' }}>
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

export default CreateUser
