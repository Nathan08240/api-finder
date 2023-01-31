import { Container } from "./style"
import FilesDisplay from "../../components/Cards/File";
import DirectoriesDisplay from "../../components/Cards/Directory";
import {useContext} from "react";
import {AuthContext} from "../../App";

export const Home = () => {
    // @ts-ignore
    const {location} = useContext(AuthContext) as string

    return (
        <Container>
            <DirectoriesDisplay location={location}/>
            <FilesDisplay location={location} />
        </Container>
    )

}
