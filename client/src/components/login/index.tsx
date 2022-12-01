import {FormControl, InputAdornment, Modal, TextField,} from '@mui/material'
import {ButtonSubmit, Form, LoginBox, LoginWrapper} from './style'
import {AccountCircle, Lock, Mail} from '@mui/icons-material'
import axios from 'axios'
import {SubmitHandler, useForm} from 'react-hook-form'
import {AuthContext} from '../../App'
import {useContext} from 'react'
import jwtDecode from "jwt-decode";

type Inputs = {
    email: string
    password: string
}
export const Login = () => {
    const {setUser, setToken} = useContext(AuthContext) as any

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const res = await axios.post(
            // @ts-ignore
            `${import.meta.env.VITE_API_URL}/api/auth/login`,
            data
        )

        const token = res.data.token
        const user = jwtDecode(token)


        setUser(user)
        setToken(token)
    }


    return (
        <AuthContext.Consumer key="lol">
            {({user, token, setToken, setUser}) => (
                    <Modal open={true}>
                        <LoginWrapper>
                            <LoginBox>
                                <AccountCircle
                                    sx={{
                                        fontSize: 75,
                                        color: 'primary.main',
                                        margin: '40px auto 0',
                                    }}
                                />
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <FormControl
                                        sx={{
                                            mt: 2,
                                            gap: 6,
                                            width: '100%',
                                        }}
                                    >
                                        <TextField
                                            required
                                            id='email'
                                            label='Email'
                                            type='email'
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        <Mail/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            {...register('email', {required: true})}
                                        />

                                        <TextField
                                            required
                                            id='password'
                                            label='Mot de passe'
                                            type='password'
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        <Lock/>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            {...register('password', {required: true})}
                                        />
                                    </FormControl>
                                    <ButtonSubmit type='submit' variant='contained'>
                                        Se connecter
                                    </ButtonSubmit>
                                </Form>
                            </LoginBox>
                        </LoginWrapper>
                    </Modal>
                )}
        </AuthContext.Consumer>
    )
}
