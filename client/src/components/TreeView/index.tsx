import React, {useEffect, useState} from 'react';
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

    let headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("authToken")
    }

    const fetchFiles = async (path: string = '/') => {
        const url = new URL(apiUrl);
        url.searchParams.set('path', path);
        const result = await fetch(url.href, {method: 'GET', headers: headers})
        return await result.json()
    }

    useEffect(() => {
        console.log(localStorage.getItem("authToken") + " is the token");
        fetchFiles().then((data) => {
            setFiles(data.files.map((file: any) => ({name: file.name, children: file.type === 'directory' ? [{name: "root"}] : undefined})));
            console.log(files)
        })
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
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
            selected={selectedFileId || undefined}
        >
            {renderTree(files)}
        </TreeView>
    );
};

export default FileTree;