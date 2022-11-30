import {Button, FormControl, InputAdornment, TextField, Typography} from '@mui/material';
import {LoginBox, LoginWrapper} from "./style";
import {Lock, Mail} from "@mui/icons-material";
import axios from "axios";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    email: string,
    password: string
}

export const Login = () => {
    const {register, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const res = await axios.post('http://localhost:5000/api/auth/login', data)
        localStorage.setItem('authToken', res.data.token);
    };

    return (
        <>
            <LoginWrapper>
                <LoginBox>
                    <Typography variant="h4" component="h1" sx={{textAlign: "center"}}>
                        Connexion
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl sx={{
                            mt: 2,
                            gap: 2,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
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
                                value="branconathan@gmail.com"
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
                            {errors.email && <span>Ce champ est requis</span>}
                        </FormControl>
                        <Button type="submit" variant="contained" sx={{mt: 2, width: "100%"}}>
                            Se connecter
                        </Button>
                    </form>
                </LoginBox>
            </LoginWrapper>
        </>
    );
}