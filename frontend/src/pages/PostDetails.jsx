import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "../services/api";
import Background from "../components/Background";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PostDetail from "../components/PostDetail";

function PostDetails() {
    let { id } = useParams();
    const [ posts, setPosts ] = useState(Object);
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const data = await getPost(id);
            setPosts(data);
            console.log('Fetched data:', data); 
          } catch (error) {
            console.error('Error fetching post:', error);
          }
        };
      
        fetchPosts();
      }, []);
    return (
        <div style={{padding: 0}}>
            <Background />
            <Header />
            <Sidebar />
            <PostDetail post={posts}/>
        </div>
    );
}

export default PostDetails;