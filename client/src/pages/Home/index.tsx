import { Container } from './style'
import FilesDisplay from '../../components/Cards/File'
import DirectoriesDisplay from '../../components/Cards/Directory'
import { useContext } from 'react'
import { AuthContext } from '../../App'
import Grid from '@mui/material/Grid'

export const Home = () => {
  // @ts-ignore
  const { location } = useContext(AuthContext) as string

  return (
    <Container>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1 }}>
        <Grid item xs={12}>
          <DirectoriesDisplay location={location} />
        </Grid>
        <Grid item xs={12}>
          <FilesDisplay location={location} />
        </Grid>
      </Grid>
    </Container>
  )
}
