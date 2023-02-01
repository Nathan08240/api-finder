import React, {useContext, useEffect, useState} from 'react'
import {makeStyles} from '@mui/styles'
import FolderIcon from '@mui/icons-material/Folder'
import {Card, CardContent, CardMedia, Typography} from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import {BackButton, Container, CardDirectory} from './style'
import {AuthContext} from '../../App'

const apiUrl = 'http://localhost:5000/api/folders'

interface Directory {
    id: string
    path: string
    name: string
    type: 'directory'
    modifiedAt: Date
    children?: File[] | Directory[]
}

const useStyles = makeStyles({
    root: {
        minWidth: 200,
        margin: '10px',
        display: 'inline-block',
        cursor: 'pointer',
        borderRadius: 0,
        boxShadow: 'none',
        border :"none"
    },
    media: {
        height: 140,
    },
    sidebarDetails: {
        margin: '10px 0',
        fontSize: '1rem',
    },
    CardContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        alignContent: 'center',
        gap: '10px'
    },
})

const DirectoryCard: React.FC<{ directory: Directory, onClick: (directory: Directory) => void }> = ({
                                                                                                        directory,
                                                                                                        onClick
                                                                                                    }) => {
    const classes = useStyles();
    const Icon = FolderIcon

    return (
        <Card className={classes.root} onClick={() => onClick(directory)}>
            <CardContent className={classes.CardContainer}>
                <Typography variant='body2' color='textSecondary' component='p'>
                    <Icon fontSize='large'/>
                </Typography>
                <Typography gutterBottom variant='h5' component='h2'>
                    {directory.name}
                </Typography>
            </CardContent>
        </Card>
    )
}

const DirectoriesDisplay: React.FC<{ location: string }> = (location) => {
    const [directories, setDirectories] = useState<Directory[]>([])
    const {user, setLocation} = useContext(AuthContext) as any
    const [path, setPath] = useState<string>(location.location)
    const [showSidebar, setShowSidebar] = useState<boolean>(false)
    const [selectedDirectory, setSelectedDirectory] = useState<Directory | undefined>(undefined)
    const classes = useStyles()

    const fetchDirectories = async (path: string) => {
        while (!localStorage.getItem("authToken") && !location.location ) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("authToken")
        };

        const url = new URL(apiUrl)
        url.searchParams.set('path', path)
        const result = await fetch(url.href, {method: 'GET', headers: headers})
        return await result.json()
    }

    useEffect(() => {
        if (!localStorage.getItem("authToken")) return;
        fetchDirectories(path).then((data) => {
            setDirectories(data.directories.map((directory: any) => ({
                id: directory.id,
                path: directory.path,
                name: directory.name,
                type: directory.type,
                modifiedAt: directory.modifiedAt,
                children: directory.children
            })));
        });
    }, [path]);


    const handleDirectoryClick = (directory: Directory) => {
        const handleClick = (event: any) => {
            switch (event.detail) {
                case 1: {
                    setShowSidebar(true)
                    setSelectedDirectory(directory)
                    break
                }
                case 2: {
                    setLocation(directory.path)
                    setPath(directory.path)
                    break
                }
                default: {
                    break
                }
            }
        }
        handleClick(event)
    }

    const handleBackButton = () => {
        if (path === `/${user.lastname}_${user.firstname}`) return
        setPath(path.substring(0, path.lastIndexOf('/')))
        setLocation(path.substring(0, path.lastIndexOf('/')))
    }


    return (
        <>
            {showSidebar && (
                <div
                    style={{
                        position: 'fixed',
                        right: '0',
                        top: '75px',
                        width: '300px',
                        height: '100%',
                        background: 'white',
                        padding: '10px',
                    }}
                >
                    <button
                        style={{
                            border: 'none',
                        }}
                        onClick={() => setShowSidebar(false)}
                    >
                        <InfoOutlinedIcon fontSize='large'/>
                    </button>
                    <div style={{fontSize: '2rem', textAlign: 'center'}}>
                        {selectedDirectory?.name}
                    </div>
                    <div className={classes.sidebarDetails}>
                        Emplacement: {selectedDirectory?.path}
                    </div>
                </div>
            )}
            <BackButton onClick={handleBackButton} disabled={path === '/'}>
                Retour
            </BackButton>
            <Container>
                {directories.map((directory) => (
                    <>
                        <DirectoryCard
                            key={directory.id}
                            directory={directory}
                            onClick={() => handleDirectoryClick(directory)}
                        />
                    </>
                ))}
            </Container>
        </>
    )
};

export default DirectoriesDisplay;

