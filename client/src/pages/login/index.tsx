import {FormControl, InputAdornment, TextField, Typography} from '@mui/material';
import {Button} from "@mui/material";
import {LoginWrapper, LoginBox} from "./style";
import {Mail, Lock} from "@mui/icons-material";
import {FormEvent} from "react";
import axios from "axios";

export const Login = () => {

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let parse = JSON.parse(JSON.stringify(Object.fromEntries(data.entries())));
        console.log(parse);
        axios.post('/api/auth/login', parse)
            .then(res => {
                console.log(res);
                console.log("Login successful");
                console.log(res.data);
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