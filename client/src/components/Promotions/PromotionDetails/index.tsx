import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Container, Typography } from '@mui/material'

const apiUrl = 'http://localhost:5000/api/promotions'

interface Promotion {
  _id: string
  name: string
  reference: string
  // referent: string
}

const PromotionDetails = () => {
  const { _id } = useParams()
  const url = new URL(apiUrl + '/' + _id)
  let headers = {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('authToken'),
  }

  const [promotionData, setPromotionData] = useState<Promotion>({
    _id: '',
    name: '',
    reference: '',
    // referent: '',
  })

  useEffect(() => {
    fetch(url, { method: 'GET', headers: headers })
      .then((data) => {
        return data.json()
      })
      .then((resp) => {
        setPromotionData(resp)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Container>
      {promotionData && (
        <div>
          <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h4'>
            Détail de la promotion
          </Typography>
          <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h6'>
            Id: {promotionData._id}
          </Typography>
          <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h6'>
            Référence: {promotionData.reference}
          </Typography>
          <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h6'>
            Nom: {promotionData.name}
          </Typography>
          {/* <Typography style={{ textAlign: 'center', margin: '10px 0' }} variant='h6'>
            Référent: {promotionData.referent}
          </Typography> */}
        </div>
      )}
      <Link
        to='/promotions'
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

export default PromotionDetails
