import React, { useState, useEffect } from "react";
import { PathButton } from "./style";
import { makeStyles } from "@mui/styles";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface BackFolderProps {
  handleBackButton: () => void;
}

const useStyles = makeStyles({
  path: {
    display: "flex",
    alignItems: "center",
    margin: "20px 0 20px 40px",
  },
  arrow: {
    display: "flex",
    alignItems: "center",
  },
});

const BackFolder: React.FC<BackFolderProps> = ({ handleBackButton }) => {
  const [location, setLocation] = useState<string[]>([]);
  const classes = useStyles();

  useEffect(() => {
    const locationFromLocalStorage = localStorage.getItem("location");

    if (locationFromLocalStorage) {
      const pathParts = locationFromLocalStorage.split("/");
      setLocation(pathParts.slice(1));
    }
  }, []);

  return (
    <>
      <div className={classes.path}>
        {location.map((loc, index) => (
          <React.Fragment key={index}>
            <PathButton onClick={handleBackButton}>{loc}</PathButton>
            {index !== location.length - 1 && (
              <div className={classes.arrow}>
                <ChevronRightIcon sx={{ color: "#646a75" }} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default BackFolder;
