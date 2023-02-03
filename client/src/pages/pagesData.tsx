import { routerType } from '../types/router.types'
import { Promotions } from './Promotions'
import { Home } from './Home'
import { Users } from './Users'
import { AppBarHead } from '../layouts/Appbar'
import ErrorPage from './Error'
import CreateUser from '../components/Users/CreateUser'
import EditUser from '../components/Users/EditUser'

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
    path: 'users',
    element: (
      <>
        <AppBarHead />
        <Users />
      </>
    ),
    errorElement: <ErrorPage />,
    title: 'home',
  },
  {
    path: 'users/create',
    element: (
      <>
        <AppBarHead />
        <CreateUser />
      </>
    ),
    errorElement: <ErrorPage />,
    title: 'create user',
  },
  {
    path: 'users/edit/:id',
    element: (
      <>
        <AppBarHead />
        <EditUser />
      </>
    ),
    errorElement: <ErrorPage />,
    title: 'edit user',
  },
  {
    path: 'promotions',
    element: (
      <>
        <AppBarHead />
        <Promotions />
      </>
    ),
    errorElement: <ErrorPage />,
    title: 'promotions',
  },
]

export default pagesData
