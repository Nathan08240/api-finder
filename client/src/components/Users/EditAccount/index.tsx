import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Container, Typography, TextField, Divider } from '@mui/material'

const apiUrl = "http://localhost:5000/api/users";
const apiPromotionsUrl = "http://localhost:5000/api/promotions";

interface User {
    _id: string;
    lastname: string;
    firstname: string;
    email: string;
    role: string;
    promotion: string[];
    name: string;
    password: string;
}

interface Promotion {
    _id: string;
    name: string;
}

const EditAccount = () => {
    const { _id } = useParams();
    console.log("id : ", _id);
    const url = new URL(apiUrl + "/" + _id);
    const urlEditPassword = new URL(apiUrl + "/editpassword/" + _id);
    let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
    };

    const [userData, setUserData] = useState<User>({
        _id: "",
        lastname: "",
        firstname: "",
        email: "",
        role: "",
        promotion: [],
        name: "",
        password: "",
    });
    const [passwords, setPasswords] = useState({
        p1: "",
        p2: "",
    })
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [promotionsData, setPromotionsData] = useState<Promotion[]>([]);

    const handlePassword1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords((prev) => ({ ...prev, p1: event.target.value }))
    }
    const handlePassword2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords((prev) => ({ ...prev, p2: event.target.value }))
    }
    const handleChangePassword = async () => {
        try {
            urlEditPassword.searchParams.append("id", userData._id)
            console.log("url before fetch : ", urlEditPassword)
            const response = await fetch(urlEditPassword, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: passwords.p1
                })
            });

            // const res = await response.json();
            // console.log("res : ", res)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (passwords.p1 === passwords.p2) {
            if (passwords.p1.length >= 8) {
                setIsDisabled(false)
            }
        } else {
            setIsDisabled(true)
        }
    }, [passwords])


    useEffect(() => {
        fetch(url, { method: "GET", headers: headers })
            .then((data) => {
                return data.json();
            })
            .then((resp) => {
                setUserData(resp);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (userData.promotion) {
            const promotionsUrl = new URL(apiPromotionsUrl);
            promotionsUrl.searchParams.append("_id", userData.promotion.join(","));
            fetch(promotionsUrl.toString(), { method: "GET", headers: headers })
                .then((data) => {
                    return data.json();
                })
                .then((resp) => {
                    setPromotionsData(resp);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [userData.promotion]);

    const promotionNames = promotionsData
        .map((promotion) => promotion.name)
        .join(", ");

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <Container>
            {userData && (
                <div>
                    <Typography
                        style={{ textAlign: "center", margin: "10px 0" }}
                        variant="h4"
                    >
                        Détail de l'utilisateur
                    </Typography>
                    {/* <Typography
            style={{ textAlign: "center", margin: "10px 0" }}
            variant="h6"
          >
            Id: {userData._id}
          </Typography> */}
                    <Typography
                        style={{ textAlign: "center", margin: "10px 0" }}
                        variant="h6"
                    >
                        Nom: {capitalizeFirstLetter(userData.lastname)}
                    </Typography>
                    <Typography
                        style={{ textAlign: "center", margin: "10px 0" }}
                        variant="h6"
                    >
                        Prénom: {capitalizeFirstLetter(userData.firstname)}
                    </Typography>
                    <Typography
                        style={{ textAlign: "center", margin: "10px 0" }}
                        variant="h6"
                    >
                        Email: {userData.email}
                    </Typography>
                    <Typography
                        style={{ textAlign: "center", margin: "10px 0" }}
                        variant="h6"
                    >
                        Role: {userData.role}
                    </Typography>
                    <Typography
                        style={{ textAlign: "center", margin: "10px 0" }}
                        variant="h6"
                    >
                        Promotion:{" "}
                        {userData.promotion.length > 0
                            ? userData.promotion.map((promoId, index) => {
                                const promotion = promotionsData.find(
                                    (promo) => promo._id === promoId
                                );
                                return (
                                    <span key={index}>
                                        {promotion ? promotion.name : "ID Promotion Inconnu"}
                                        {index < userData.promotion.length - 1 ? ", " : ""}
                                    </span>
                                );
                            })
                            : "Aucune promotion"}
                    </Typography>
                    <Divider />
                    <Typography
                        style={{ textAlign: "center", margin: "10px 0" }}
                        variant="h6"
                    >
                        Modifier mot de passe (8 caractères minimum)

                        <TextField sx={{ mt: 2 }} fullWidth name="password1" type="password" label="Nouveau mot de passe" value={passwords.p1} onChange={handlePassword1Change} />
                        <TextField sx={{ mt: 2 }} fullWidth name="password2" type="password" label="Confirmer" value={passwords.p2} onChange={handlePassword2Change} />
                        <Button sx={{ mt: 2 }} fullWidth disabled={isDisabled} type="submit" variant="contained" color="primary" onClick={handleChangePassword}>Envoyer</Button>
                    </Typography>
                    <Divider sx={{mb: 2}} />
                </div>
            )}
            <Link
                to="/"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    textDecoration: "none",
                    color: "#000",
                    marginRight: "10px",
                }}
            >
                <Button variant="contained" color="inherit">
                    Retour
                </Button>
            </Link>
        </Container>
    );
};



export default EditAccount;