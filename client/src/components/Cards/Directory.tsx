import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Card, CardContent, Typography } from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import BackFolder from "../BackFolder/BackFolder";
import Grid from "@mui/material/Grid";

import { AuthContext } from "../../App";
//@ts-ignore
const apiUrl = `${import.meta.env.VITE_API_URL}/api/folders`;

interface Directory {
  id: string;
  path: string;
  name: string;
  type: "directory";
  modifiedAt: Date;
  children?: File[] | Directory[];
}

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    cursor: "pointer",
    borderRadius: "10px",
    marginBottom: "20px",
    border: "1px solid #a6a6a6",
  },
  CardContainer: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    wordBreak: "break-word",
    padding: "10px",
  },
});

const DirectoryCard: React.FC<{
  directory: Directory;
  onClick: (directory: Directory) => void;
}> = ({ directory, onClick }) => {
  const classes = useStyles();
  const Icon = FolderIcon;

  return (
    <Card className={classes.root} onClick={() => onClick(directory)}>
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <div className={classes.CardContainer}>
          <Typography variant="body2" color="textSecondary" component="p">
            <Icon fontSize="large" />
          </Typography>
          <Typography variant="h6" component="h2" ml={1}>
            {directory.name}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

const DirectoriesDisplay: React.FC<{ location: string }> = (location) => {
  const [directories, setDirectories] = useState<Directory[]>([]);
  const { user, setLocation, promotion } = useContext(AuthContext) as any;
  const [path, setPath] = useState<string>(location.location);

  const fetchDirectories = async (path: string = location.location) => {
    while (!localStorage.getItem("authToken") && !location.location) {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }

    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    };

    const url = new URL(apiUrl);
    url.searchParams.set("path", path);
    const result = await fetch(url.href, { method: "GET", headers: headers });
    return await result.json();
  };

  useEffect(() => {
    if (!localStorage.getItem("authToken")) return;
    fetchDirectories(path).then((data) => {
      setDirectories(
        data.directories.map((directory: Directory) => ({
          id: directory.id,
          path: directory.path,
          name: directory.name,
          type: directory.type,
          modifiedAt: directory.modifiedAt,
          children: directory.children,
        }))
      );
    });
  }, [path]);

  const handleDirectoryClick = (directory: Directory) => {
    setLocation(directory.path);
    setPath(directory.path);
  };

  const handleBackButton = () => {
    if (user?.role !== "student") {
      if (path === "/BDD") return;
      setPath(path.substring(0, path.lastIndexOf("/")));
      setLocation(path.substring(0, path.lastIndexOf("/")));
    } else if (user?.role === "student") {
      if (path === `/BDD/${promotion[0]}`) return;
      setPath(path.substring(0, path.lastIndexOf("/")));
      setLocation(path.substring(0, path.lastIndexOf("/")));
    }
  };

  const studentDirectory = (
    <Grid container>
      {directories.map(
        (directory) =>
          directory.name === `${user?.lastname}_${user?.firstname}` && (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={4}
              xl={2}
              key={directory.id}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <DirectoryCard
                directory={directory}
                onClick={() => handleDirectoryClick(directory)}
              />
            </Grid>
          )
      )}
    </Grid>
  );

  const studentPromotionDirectory = (
    <Grid container>
      {directories.map((directory) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          xl={2}
          key={directory.id}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <DirectoryCard
            directory={directory}
            onClick={() => handleDirectoryClick(directory)}
          />
        </Grid>
      ))}
    </Grid>
  );

  const adminSupportDirectory = (
    <Grid container>
      {directories.map((directory) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          lg={4}
          xl={2}
          key={directory.id}
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "0px",
          }}
        >
          <DirectoryCard
            directory={directory}
            onClick={() => handleDirectoryClick(directory)}
          />
        </Grid>
      ))}
    </Grid>
  );

  const pilotPromotionDirectory = (
    <Grid container>
      {directories
        .filter((directory) => promotion.includes(directory.name))
        .map((directory) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={2}
            key={directory.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "0px",
            }}
          >
            <DirectoryCard
              directory={directory}
              onClick={() => handleDirectoryClick(directory)}
            />
          </Grid>
        ))}
    </Grid>
  );

  const speakerPromotionDirectory = (
    <Grid container>
      {path === "/BDD" && directories
        .filter((directory) => promotion.includes(directory.name))
        .map((directory) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={2}
            key={directory.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              padding: "0px",
            }}
          >
            <DirectoryCard
              directory={directory}
              onClick={() => handleDirectoryClick(directory)}
            />
          </Grid>
        ))}
    </Grid>
  );

  const shouldRenderStudentDirectory =
    path === `/BDD/${promotion}` && user?.role === "student";
  const shouldRenderStudentPromotionDirectory =
    path.startsWith(`/BDD/${promotion}/${user?.lastname}_${user?.firstname}`) &&
    user?.role === "student";
  const shouldRenderAdminSupportDirectory =
    user?.role === "administration" || (user?.role === "support" && true);
  const shouldRenderPilotDirectory = (user?.role === "pilot" && true);
  const shouldRenderPilotPromotionDirectory = 
    path !== '/BDD' && user?.role === "pilot"
  const shouldRenderSpeakerDirectory = (user?.role === 'speaker' && true);

  return (
    <>
      <Grid container>
        <Grid item xs={10}>
          <BackFolder handleBackButton={handleBackButton} />
        </Grid>
        <Grid item xs={2} />
        {shouldRenderStudentDirectory && studentDirectory}
        {shouldRenderStudentPromotionDirectory && studentPromotionDirectory}
        {shouldRenderAdminSupportDirectory && adminSupportDirectory}
        {shouldRenderPilotDirectory && pilotPromotionDirectory}
        {shouldRenderPilotPromotionDirectory && 
          (promotion.map((promotion: string) => path.startsWith(`/BDD/${promotion}`) ?
            adminSupportDirectory
            : ''))}
        {shouldRenderSpeakerDirectory && speakerPromotionDirectory}
        <Grid item xs={2} />
      </Grid>
    </>
  );
};

export default DirectoriesDisplay;
