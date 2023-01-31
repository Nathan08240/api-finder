import { Container } from "./style"
import FilesDisplay from "../../components/Cards/File";
import DirectoriesDisplay from "../../components/Cards/Directory";

export const Home = () => {
    return (
        <Container>
            <FilesDisplay/>
            <DirectoriesDisplay/>
        </Container>
    )
    
}
