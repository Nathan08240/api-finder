import { useState, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Grid,
  OutlinedInput,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

const apiUrl = "http://localhost:5000/api/users";
const apiPromotionsUrl = "http://localhost:5000/api/promotions";

interface Promotion {
  _id: string;
  name: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const roles = [
  { value: "support", label: "Support" },
  { value: "administration", label: "Administration" },
  { value: "pilot", label: "Pilote" },
  { value: "speaker", label: "Intervenant" },
  { value: "student", label: "Etudiant" },
];

const CreateUser = () => {
  const [id, setId] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [promotion, setPromotion] = useState<string[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent<typeof promotion>) => {
    const {
      target: { value },
    } = event;
    setPromotion(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    const fetchPromotions = async () => {
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      };
      await fetch(apiPromotionsUrl, { method: "GET", headers: headers })
        .then((res) => res.json())
        .then((data) => {
          setPromotions(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPromotions();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = new URL(apiUrl);
    const userData = { lastname, firstname, email, password, role, promotion };
    const headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    };

    await fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(userData),
    })
      .then((res) => {
        alert("Utilisateur créé avec succès");
        navigate("/users");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Container>
      <Typography
        style={{ textAlign: "center", margin: "10px 0" }}
        variant="h4"
      >
        Ajouter un utilisateur
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              disabled
              autoFocus
              fullWidth
              label="Id"
              name="_id"
              onChange={(e) => setId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              fullWidth
              label="Nom"
              name="lastname"
              onChange={(e) => setLastname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Prénom"
              name="firstname"
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mot de passe"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="role-select">Rôle</InputLabel>
              <Select
                onChange={(e: SelectChangeEvent<string>) =>
                  setRole(e.target.value)
                }
                inputProps={{
                  name: "role",
                  id: "role-select",
                }}
              >
                {roles.map((role, index) => (
                  <MenuItem key={index} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-name-label">Promotion</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={promotion}
                onChange={handleChange}
                input={<OutlinedInput label="Promotion" />}
                MenuProps={MenuProps}
              >
                {promotions &&
                  promotions.map((promotion: Promotion) => (
                    <MenuItem key={promotion._id} value={promotion._id}>
                      {promotion.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Box mt={2} style={{ display: "flex", justifyContent: "end" }}>
              <Link
                to="/users"
                style={{
                  textDecoration: "none",
                  color: "#000",
                  marginRight: "10px",
                }}
              >
                <Button variant="contained" color="inherit">
                  Retour
                </Button>
              </Link>
              <Button variant="contained" color="primary" type="submit">
                Ajouter
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CreateUser;
