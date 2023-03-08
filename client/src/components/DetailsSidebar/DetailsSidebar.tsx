import React, {useContext} from "react";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import { AuthContext } from "../../App";
import { makeStyles } from "@mui/styles";

interface DetailsSidebarProps {
  selectedContent: {
    name: string;
    size: number;
    type: string;
    path: string;
    extension?: string;
    modifiedAt: string;
  };
  setShowSidebar: (show: boolean) => void;
  showSidebar: boolean;
}

const useStyles = makeStyles({
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    cursor: "pointer",
    margin: "5px",
  },
  fileName: {
    fontSize: "2rem",
    textAlign: "center",
    margin: "20px 10px",
    wordBreak: 'break-word',
  },
  table: {
    border: "none",
    "& td": {
      border: "none",
    },
  },
  text: {
    wordBreak: 'break-word',
  }
});

const DetailsSidebar: React.FC<DetailsSidebarProps> = ({
  selectedContent,
  setShowSidebar,
  showSidebar,
}) => {
  const classes = useStyles();
  const { counter, setCounter, user, location, promotion } = useContext(
    AuthContext
  ) as any;

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("authToken"),
  };

  const path = selectedContent?.path;
  console.log(path)
  const pathArray = path?.split("/");

  const updatedPath = `${pathArray?.slice(2, pathArray.length - 1).join("/")}/`;

  const size = Math.floor(selectedContent?.size) + "KB";

  const details = [
    { label: "Format", value: selectedContent?.extension?.toUpperCase() },
    { label: "Taille", value: size },
    {
      label: "Modifié",
      value: new Date(selectedContent?.modifiedAt).toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    },
    {
      label: "Emplacement",
      value: updatedPath,
    },
  ];

  const apiUrl = `http://localhost:5000/api/files?target=${path}`;
  const apiDownloadUrl = `http://localhost:5000/api/files/download?target=${path}`;
  console.log(apiDownloadUrl)
  const handleDownload = async () => {
    window.open(apiDownloadUrl, '_blank')
  };

  const handleDelete = async () => {
    try {
      await fetch(apiUrl, {
        method: "DELETE",
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
    } catch (error) {
      console.log(error);
    }
    setShowSidebar(false);
    setCounter(counter + 1);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
  };

  return (
    <Modal open={showSidebar}>
      <Box sx={style}>
        <div className={classes.buttonContainer}>
          <div>
            <IconButton onClick={handleDownload} className={classes.button}>
              <DownloadIcon />
            </IconButton>
            <IconButton
              disabled={
                (location === "/BDD/" + promotion[0] &&
                  user?.role === "student") ??
                true
              }
              onClick={handleDelete}
              className={classes.button}
            >
              <DeleteIcon />
            </IconButton>
          </div>
          <IconButton
            onClick={() => setShowSidebar(false)}
            className={classes.button}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div className={classes.fileName}>{selectedContent?.name}</div>
        <Table className={classes.table}>
          <TableBody>
            {details.map(({ label, value }) => (
              <TableRow key={label}>
                <TableCell>{label}:</TableCell>
                <TableCell className={classes.text}>{value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Modal>
  );
};

export default DetailsSidebar;
