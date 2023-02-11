import React from 'react';
import {
    ListItem,
    ListItemText,
    ListItemIcon
} from "@mui/material";
import { CircularProgressWithLabel } from '../../components/CircularWithProgression'
import { AuthContext } from '../../App'

interface File {
    id: string;
    size: number;
}

interface Directory {
    id: string;
    children?: File[] | Directory[];
}

const Storage: React.FC = () => {
    const { user } = React.useContext(AuthContext) as any
    const path = `/${user?.lastname}_${user?.firstname}`

    const [filesSize, setFilesSizes] = React.useState([])

    const fetchFiles = async (path: string) => {
        let headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('authToken'),
        }
        const apiUrl = 'http://localhost:5000/api/files'
        const url = new URL(apiUrl)
        url.searchParams.set('path', path)
        const result = await fetch(url.href, { method: 'GET', headers: headers })
        return await result.json()
    }

    const fetchDirectories = async (path: string) => {
        let headers = {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('authToken'),
        }
        const apiUrl = 'http://localhost:5000/api/folders'
        const url = new URL(apiUrl)
        url.searchParams.set('path', path)
        const result = await fetch(url.href, { method: 'GET', headers: headers })
        return await result.json()
    }

    React.useEffect(() => {
        var temp: any = []
        if (!localStorage.getItem('authToken')) return
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

    return (
        <>
            <ListItem key='Stockage'>
                <ListItemText>Stockage<br />{Math.round(filesSize.reduce((a: number, b: number) => a + b, 0) / 1000)}Mo / 1Go</ListItemText>
                <ListItemIcon>
                    <CircularProgressWithLabel value={Math.round(filesSize.reduce((a: number, b: number) => a + b, 0) / 10000)} />
                </ListItemIcon>
            </ListItem>
        </>
    )
}

export default Storage;