import { useEffect, useState } from "react";
import Main from "../components/Main"
import Sidebar from "../components/Sidebar"
import { getPosts } from "../services/api";
import Background from "../components/Background";


function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data.posts);
        console.log(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    console.log(posts);
  }, [posts]);

  
  return (
    <div style={{padding: 0}}>
        <Background />
        
        <Sidebar />
        <Main />
    </div>
  )
}

export default Home