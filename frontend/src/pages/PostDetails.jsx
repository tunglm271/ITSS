import { useParams } from "react-router-dom";
import { getPost } from "../services/api";
import Background from "../components/Background";
import Header from "../components/Header";

function PostDetails() {
    let { id } = useParams();
    let data = getPost(id);
    return (
        <div style={{padding: 0}}>
            <Background />
            <Header />
        </div>
    );
}

export default PostDetails;