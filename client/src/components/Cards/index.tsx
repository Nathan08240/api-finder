import React, {useEffect, useState} from 'react';
import { makeStyles } from "@mui/styles";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import FolderIcon from '@mui/icons-material/Folder';
import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import {BackButton} from "./style";

const apiUrl = "http://localhost:5000/api/files";

interface File {
    id: string;
    name: string;
    type: "file" | "folder";
    children?: File[];
}

const useStyles = makeStyles({
    root: {
        minWidth: 200,
        margin: '10px',
        display: 'inline-block',
        cursor: 'pointer'
    },
    media: {
        height: 140,
    },
});

const FileCard: React.FC<{ file: File, onClick: (file: File) => void }> = ({ file, onClick }) => {
    const classes = useStyles();
    const Icon = file.type === "file" ? InsertDriveFileIcon : FolderIcon;

    return (
        <Card className={classes.root} onClick={() => onClick(file)}>
            <CardMedia
                className={classes.media}
                image={`https://via.placeholder.com/300x200/${file.type === "file" ? "555555" : "007777"}/ffffff?text=${file.type === "file" ? "File" : "Folder"}`}
                title={file.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {file.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                    <Icon fontSize="large" />
                </Typography>
            </CardContent>
        </Card>
    );
};

const FilesDisplay: React.FC = () => {
    const [ files, setFiles ] = useState<File[]>([]);
    const [ path, setPath ] = useState<string>('/');

    const fetchFiles = async (path: string = '/') => {
        while (!localStorage.getItem("authToken")) {
            await new Promise(resolve => setTimeout(resolve, 50));
        }

        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem("authToken")
        };

        const url = new URL(apiUrl);
        url.searchParams.set('path', path);
        const result = await fetch(url.href, {method: 'GET', headers: headers});
        return await result.json();
    };

    const handleBackButton = () => {
        if (path === "/") return;
        setPath(path.split('/').slice(0, -2).join('/') + '/');
    };

    useEffect(() => {
        if (!localStorage.getItem("authToken")) return;
        fetchFiles(path).then((data) => {
            setFiles(data.files.map((file: any) => ({
                id: file.id,
                name: file.name,
                children: file.type === 'directory ' ? file.children : undefined,
                type: file.type,
            })));
        });
    }, [path]);


    const handleFileClick = (file: File) => {
        if (file.type === 'file') return;
        setPath(path + file.name + '/');
    };

    return (
        <>
        <BackButton onClick={handleBackButton} disabled={path === "/"}>
            Retour
        </BackButton>
        <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '75px' }}>
            {files.map(file => (
                <FileCard
                    key={file.id}
                    file={file}
                    onClick={() => handleFileClick(file)}
                />
            ))}
        </div>
        </>
    );
};

export default FilesDisplay;


