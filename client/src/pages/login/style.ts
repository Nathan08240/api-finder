import styled from "styled-components";
import {Card} from "@mui/material";

export const LoginWrapper = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #f1f1f1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LoginBox = styled(Card)`
    width: 33%;
    height: 66%;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

