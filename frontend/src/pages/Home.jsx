import { useContext, useEffect, useState } from "react";
import Main from "../components/Main"
import Sidebar from "../components/Sidebar"
import { getPosts } from "../services/api";
import Background from "../components/Background";
import { globalContext } from "../App";


function Home() {
  const { posts, setPosts} = useContext(globalContext);

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
        <Main posts={posts}/>

    </div>
  )
}

export default Home