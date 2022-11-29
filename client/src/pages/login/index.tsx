import {FormControl, InputAdornment, Card, TextField, Typography} from '@mui/material';
import {Button} from "@mui/material";
import {LoginWrapper, LoginBox} from "./style";
import {Mail, Lock} from "@mui/icons-material";
import {FormEvent} from "react";

export const Login = () => {

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // eslint-disable-next-line no-console
        //send data to api
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
        await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password'),

            }),
        })

    }

    return (
        <LoginWrapper>
            <LoginBox>
                <Typography variant="h4" component="h1" sx={{textAlign: "center"}}>
                    Connexion
                </Typography>
                <form onSubmit={handleSubmit}>
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
                            name="email"
                            label="Email"
                            type="email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Mail/>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <TextField
                            required
                            id="password"
                            name="password"
                            label="Mot de passe"
                            type="password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock/>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </FormControl>
                    <Button type="submit" variant="contained" sx={{mt: 2, width: "100%"}}>
                        Se connecter
                    </Button>
                </form>
            </LoginBox>
        </LoginWrapper>
    );
}