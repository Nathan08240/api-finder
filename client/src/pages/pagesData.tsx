import { routerType } from '../types/router.types'
import { Promotion } from './Promotion'
import { Home } from './Home'
import { AppBarHead } from '../layouts/appbar'
import ErrorPage from './error'

const pagesData: routerType[] = [
  {
    path: '',
    element: (
      <>
        <AppBarHead />
        <Home />
      </>
    ),
    errorElement: <ErrorPage />,
    title: 'home',
  },
  {
    path: 'promotion',
    element: (
      <>
        <AppBarHead />
        <Promotion />
      </>
    ),
    errorElement: <ErrorPage />,
    title: 'promotion',
  },
]

export default pagesData
