import React from "react"
import { Link } from "react-router-dom"
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material"
import { FC, useContext } from "react"
import { makeStyles } from "@mui/styles"
import { AuthContext } from "../../App"
import ConfirmLogout from "../../components/Confirm"
import CreateFolder from "../../components/CreateFolder"
import UploadFile from "../../components/UploadFile"
import Storage from "../../components/Storage"
import HomeIcon from "@mui/icons-material/Home"
import DriveFolderUploadRoundedIcon from "@mui/icons-material/DriveFolderUploadRounded"
import DriveFileMoveRoundedIcon from "@mui/icons-material/DriveFileMoveRounded"
import PeopleIcon from "@mui/icons-material/People"
import SchoolIcon from "@mui/icons-material/School"
import { ClassNames } from "@emotion/react"

interface SideBarProps {
  open: boolean
}

interface RoleParams {
  role: string
}

const useStyles = makeStyles({
  link: {
    color: "black",
    textDecoration: "none",
  },
})

export const Sidebar: FC<SideBarProps> = ({ open }) => {
  const { user } = useContext(AuthContext) as any
  const classes = useStyles()

  const role = ({ role }: RoleParams) => {
    switch (role) {
      case "support":
        return "Support"
      case "administration":
        return "Administration"
      case "pilot":
        return "Pilote"
      case "speaker":
        return "Intervenant"
      case "student":
        return "Etudiant"
      default:
        return "Utilisateur"
    }
  }

  const [activeTab, setActiveTab] = React.useState("bibliotheque")

  const [storage, setStorage] = React.useState(0)

  // début calcul de l'occupation du stockage

  const path = `/${user?.lastname}_${user?.firstname}`

  const [filesSize, setFilesSizes] = React.useState([])

  const fetchFiles = async (path: string) => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    }
    const apiUrl = "http://localhost:5000/api/files"
    const url = new URL(apiUrl)
    url.searchParams.set("path", path)
    const result = await fetch(url.href, { method: "GET", headers: headers })
    return await result.json()
  }

  const fetchDirectories = async (path: string) => {
    let headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("authToken"),
    }
    const apiUrl = "http://localhost:5000/api/folders"
    const url = new URL(apiUrl)
    url.searchParams.set("path", path)
    const result = await fetch(url.href, { method: "GET", headers: headers })
    return await result.json()
  }

  React.useEffect(() => {
    var temp: any = []
    if (!localStorage.getItem("authToken")) return
    fetchFiles(path).then((data) => {
      const sizes = data.files.map((file: any) => file.size)
      temp.push(sizes)
    })
    fetchDirectories(path).then((data) => {
      data.directories.map((directory: any) => {
        fetchFiles(directory.path).then((data) => {
          const sizes = data.files.map((file: any) => file.size)
          sizes.map((size: any) => {
            temp[0].push(size)
          })
          setFilesSizes(temp[0])
        })
      })
    })
  }, [])

  const calculateStorageMo = Math.round(filesSize.reduce((a: number, b: number) => a + b, 0) / 1000)

  // fin calcul de l'occupation du stockage

  return (
    <Drawer
      variant='persistent'
      anchor='left'
      open={!open}
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
        },
        zIndex: 2,
      }}
    >
      <Typography variant='h5' sx={{ p: 2, textAlign: "center" }}>
        {user?.is_confirmed ? user.fullname : "Get Dropped"}
      </Typography>
      <Divider />
      <Paper
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {user?.is_confirmed && (
          <>
            <List
              sx={{
                height: "90%",
              }}
            >
              <ListItem
                key='bibliotheque'
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setActiveTab("bibliotheque")
                }}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <Link className={classes.link} to='/'>
                  <ListItemText>Bibliothèque</ListItemText>
                </Link>
              </ListItem>
              <CreateFolder activeTab={activeTab} setActiveTab={setActiveTab} />
              {/* <ListItem
                key='importerDossier'
                disabled={activeTab != "bibliotheque" ? true : false}
                onClick={() => {
                  if (activeTab != "bibliotheque") {
                    return
                  } else {
                    alert("importer un dossier")
                  }
                }}
                style={{ cursor: "pointer" }}
              >
                <ListItemIcon>
                  <DriveFolderUploadRoundedIcon />
                </ListItemIcon>
                <ListItemText>Importer un dossier</ListItemText>
              </ListItem> */}

              <UploadFile activeTab={activeTab} setActiveTab={setActiveTab} calculateStorageMo={calculateStorageMo} />
              <Divider />
              {(user?.role === "support" || user?.role === "administration") && (
                <>
                  <ListItem
                    key='User'
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setActiveTab("users")
                    }}
                  >
                    <ListItemIcon>
                      <PeopleIcon />
                    </ListItemIcon>
                    <Link className={classes.link} to='/users'>
                      <ListItemText>Gestion des Utilisateurs</ListItemText>
                    </Link>
                  </ListItem>
                  <ListItem
                    key='Promotion'
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setActiveTab("promotions")
                    }}
                  >
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <Link className={classes.link} to='/promotions'>
                      <ListItemText>Gestion des Promotions</ListItemText>
                    </Link>
                  </ListItem>
                </>
              )}
              <Divider />
              <Storage storage={calculateStorageMo} />
              <Divider />
              <ListItem key='Utilisateur'>
                <ListItemText>Connecté :</ListItemText>
              </ListItem>
              <ListItemText sx={{ paddingLeft: 2 }}>{user?.email ?? " "}</ListItemText>
              <ListItemText sx={{ paddingLeft: 2 }}>{role({ role: user?.role })}</ListItemText>
            </List>
            <ConfirmLogout />
          </>
        )}
      </Paper>
    </Drawer>
  )
}
