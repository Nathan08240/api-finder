import { BrowserRouter } from 'react-router-dom'
import Router from './pages/router'
import { theme } from './Themes'
import { ThemeProvider } from '@mui/material'
import { type Context, createContext, useEffect, useState } from 'react'
import { Login } from './components/Login'

export let AuthContext: Context<any>

export default function App() {
  const [token, setToken] = useState<null | string>(localStorage.getItem('authToken') ?? null)
  const [user, setUser] = useState<null | any>(
    token && localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
  )
  const [location, setLocation] = useState<null | string>(`/${user?.lastname}_${user?.firstname}`)
  AuthContext = createContext({
    location,
    token,
    user,
    setLocation,
    setUser,
    setToken,
  })

  useEffect(() => {
    token ? localStorage.setItem('authToken', token) : localStorage.removeItem('authToken')
    token ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user')
    user?.exp < Date.now() / 1000 ? (setUser(null), setToken(null)) : null
    location ? localStorage.setItem('location', location) : localStorage.removeItem('location')
  }, [token, user, location])

  return (
    <AuthContext.Provider value={{ location, user, token, setLocation, setToken, setUser }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>{!user?.is_confirmed ? <Login /> : <Router />}</BrowserRouter>
      </ThemeProvider>
    </AuthContext.Provider>
  )
}
