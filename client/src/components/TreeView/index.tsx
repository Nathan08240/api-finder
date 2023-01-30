import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';

const apiUrl = "http://localhost:5000/api/files";

interface File {
    id: string;
    name: string;
    children?: File[];
}

const FileTree: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

    useEffect(() => {
        axios.get<File[]>(apiUrl, {
            headers: {
                "path": "/",
                "Authorization": "Bearer " + localStorage.getItem("authToken")
            },
        })
            .then(res => setFiles(res.data))
            .catch(error => console.error(error));
    }, []);

    const handleNodeClick = (event: React.MouseEvent, file: File) => {
        setSelectedFileId(file.id);
    };

    const renderTree = (files: File[]) => (
        files.map(file => (
            <TreeItem
                key={file.id}
                nodeId={file.id}
                label={file.name}
                onClick={event => handleNodeClick(event, file)}
            >
                {Array.isArray(file.children) ? renderTree(file.children) : null}
            </TreeItem>
        ))
    );

    return (
        <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
            selected={selectedFileId || undefined}
        >
            {renderTree(files)}
        </TreeView>
    );
};

export default FileTree;