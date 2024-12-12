import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../services/api";
import PostDetail from "../components/PostDetail";

function PostDetails() {
    let { id } = useParams();
    const [ post, setPost ] = useState(Object);
    useEffect(() => {
        const fetchPost = async () => {
          try {
            const data = await getPost(id);
            setPost(data);
            console.log('Fetched data:', data); 
          } catch (error) {
            console.error('Error fetching post:', error);
          }
        };
      
        fetchPost();
      }, []);
      
    return (
        <div>
            <PostDetail post={post} id={id}/>
        </div>
    );
}

export default PostDetails;