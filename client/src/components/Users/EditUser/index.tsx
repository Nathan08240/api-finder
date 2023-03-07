import { useEffect, useState, useContext, FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { AuthContext } from "../../../App";

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

const EditUser = () => {
  const { user } = useContext(AuthContext) as any;
  const [id, setId] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [promotion, setPromotion] = useState<string[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const navigate = useNavigate();
  const { _id } = useParams();
  const url = new URL(apiUrl + "/" + _id);
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("authToken"),
  };

  const handleChange = (event: SelectChangeEvent<typeof promotion>) => {
    const {
      target: { value },
    } = event;
    setPromotion(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    fetch(url, { method: "GET", headers: headers })
      .then((data) => {
        return data.json();
      })
      .then((resp) => {
        setId(resp._id);
        setLastname(resp.lastname);
        setFirstname(resp.firstname);
        setEmail(resp.email);
        setPassword(resp.password);
        setRole(resp.role);
        user.role = resp.role;
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(apiPromotionsUrl, { method: "GET", headers: headers })
      .then((data) => {
        return data.json();
      })
      .then((resp) => {
        setPromotions(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const url = new URL(apiUrl + "/" + _id);
    const userData = { lastname, firstname, email, password, role, promotion };
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    };

    await fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(userData),
    })
      .then((res) => {
        alert("Utilisateur modifié avec succès");

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
        Modifier l'utilisateur
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              disabled
              fullWidth
              name="_id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              autoFocus
              fullWidth
              label="Nom"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Prénom"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              hidden
              fullWidth
              label="Mot de passe"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel htmlFor="role-select">Rôle</InputLabel>
              <Select
                value={role}
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
                Modifier
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default EditUser;
