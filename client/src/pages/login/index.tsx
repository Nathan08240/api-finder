import {Button, FormControl, InputAdornment, TextField, Typography} from '@mui/material';
import {Form, LoginBox, LoginWrapper} from "./style";
import {Lock, Mail} from "@mui/icons-material";
import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";
import jwtDecode from "jwt-decode";
import {AuthContext} from "../../App";
import {useContext} from "react";

type Inputs = {
    email: string,
    password: string
}
export const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const res = await axios.post('/api/auth/login', data)
        const token = res.data.token;
        localStorage.setItem('authToken', token);
    };

    const token = useContext(AuthContext) as string;
    // const user = jwtDecode(token);
    // console.log(user);


    return (
        <LoginWrapper>
            <LoginBox>
                <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                        textAlign: "center",
                        marginBottom: "1rem"

                }}>
                    Connexion
                </Typography>
                <Form onSubmit={handleSubmit(onSubmit)} >
                    <FormControl sx={{
                        mt: 2,
                        gap: 6,
                        width: "100%",
                    }}>
                        <TextField
                            required
                            id="email"
                            label="Email"
                            type="email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Mail/>
                                    </InputAdornment>
                                ),
                            }}
                            {...register("email", {required: true})}
                        />

                        <TextField
                            required
                            id="password"
                            label="Mot de passe"
                            type="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock/>
                                    </InputAdornment>
                                ),
                            }}
                            value="Azerty.51&"
                            {...register("password", {required: true})}
                        />
                    </FormControl>
                    <Button type="submit" variant="contained" sx={{mt: 6, width: "50%"}}>
                        Se connecter
                    </Button>
                </Form>
            </LoginBox>
        </LoginWrapper>
    );
}