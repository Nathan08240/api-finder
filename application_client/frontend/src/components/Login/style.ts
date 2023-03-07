import styled from 'styled-components'
import { Card, Button } from '@mui/material'

export const LoginWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginBox = styled(Card)`
  width: 100vw;
  height: 100VH;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);

`

export const Form = styled.form`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const ButtonSubmit = styled(Button)`
  margin-top: 30px;
`
