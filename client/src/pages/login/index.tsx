import {FormControl} from '@mui/material';
import {LoginStyle} from './style'
import {Card} from "@mui/material";

export const Login = () => {
    return (
        <Card>
            <FormControl>
                <label htmlFor="email">
                    <input type="email" name="email" placeholder="email"/>
                </label>
                <label htmlFor="password">
                    <input type="password" name="password" placeholder="password"/>
                </label>
                <label htmlFor="submit">
                    <input type="submit" name="submit" value="Login"/>
                </label>
            </FormControl>
        </Card>
    );
}