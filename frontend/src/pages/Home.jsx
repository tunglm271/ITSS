import { useContext, useEffect, useState } from "react";
import Main from "../components/Main"
import Sidebar from "../components/Sidebar"
import { getPosts } from "../services/api";
import Background from "../components/Background";
import CreatePostPopUp from "../components/CreatePostPopUp";
import { globalContext } from "../App";


function Home() {
  const [posts, setPosts] = useState();
  const {togglePopup, setTogglePopup} = useContext(globalContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
        console.log('Fetched data:', data); 
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
  
    fetchPosts();
  }, []);
  
  useEffect(() => {
    console.log('Posts state updated:', posts);  
  }, [posts]);
  

  
  return (
    <div style={{padding: 0}}>
        <Background />
        
        <Sidebar />
        <Main posts={posts}/>

        <CreatePostPopUp  open={togglePopup} onClose={() => setTogglePopup(false)}/>        
    </div>
  )
}

export default Home