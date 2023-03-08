import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
  Typography,
} from "@mui/material";
import { Delete, ModeEdit, VisibilityOutlined } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
//@ts-ignore
const apiUrl = `${import.meta.env.VITE_API_URL}/api/promotions`;
//@ts-ignore
const apiUsersUrl = `${import.meta.env.VITE_API_URL}/api/users`;

interface Promotion {
  _id: string;
  name: string;
  reference: string;
  referent: string;
}
interface User {
  _id: string;
  firstname: string;
  lastname: string;
}

const useStyles = makeStyles({
  link: {
    color: "black",
    textDecoration: "none",
    margin: "0 auto",
  },
});

export const Promotions = () => {
  const [promotionsData, setPromotionsData] = useState<Promotion[]>([]);
  const [referentData, setReferentData] = useState<User[]>([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const url = new URL(apiUrl);
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("authToken"),
  };

  const loadDetails = (_id: string) => {
    navigate(`details/${_id}`);
  };

  const loadEdit = (_id: string) => {
    navigate(`edit/${_id}`);
  };

  const RemoveFunction = async (_id: string) => {
    if (window.confirm("Voulez-vous supprimer cette Promotion ?")) {
      const url = new URL(apiUrl + "/" + _id);
      let headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("authToken"),
      };
      await fetch(url, { method: "DELETE", headers: headers })
        .then((resp) => {
          alert("Promotion supprimée avec succès !");
          window.location.reload();
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  useEffect(() => {
    fetch(url, { method: "GET", headers: headers })
      .then((data) => {
        return data.json();
      })
      .then((resp) => {
        setPromotionsData(resp);
      })
      .catch((err) => {
        console.log(err);
      });
    fetch(apiUsersUrl, { method: "GET", headers: headers })
      .then((data) => {
        return data.json();
      })
      .then((resp) => {
        setReferentData(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container>
      <Typography
        style={{ textAlign: "center", margin: "10px 0" }}
        variant="h4"
      >
        Liste des promotions
      </Typography>
      <Link className={classes.link} to="/promotions/create">
        <Button color="inherit" variant="contained">
          Créer une promotion
        </Button>
      </Link>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Référence</TableCell>
            <TableCell align="center">Nom</TableCell>
            <TableCell align="center">Réferent</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {promotionsData &&
            promotionsData.map((promotion: Promotion) => {
              const referent = referentData.find(
                (user) => user._id === promotion.referent
              );
              return (
                <TableRow key={promotion._id}>
                  <TableCell align="center">{promotion.reference}</TableCell>
                  <TableCell align="center">{promotion.name}</TableCell>
                  <TableCell align="center">
                    {referent
                      ? `${referent.firstname} ${referent.lastname}`
                      : "Aucun référant"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      color="inherit"
                      onClick={() => {
                        loadDetails(promotion._id);
                      }}
                    >
                      <VisibilityOutlined />
                    </Button>
                    <Button
                      color="inherit"
                      onClick={() => {
                        loadEdit(promotion._id);
                      }}
                    >
                      <ModeEdit />
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => {
                        RemoveFunction(promotion._id);
                      }}
                    >
                      <Delete />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </Container>
  );
};
