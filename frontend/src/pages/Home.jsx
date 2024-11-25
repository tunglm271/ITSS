import { useEffect, useState } from "react";
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { getPosts } from "../services/api";


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
        <Header />
        <Sidebar />

        <div style={{
          marginLeft: '300px',
          marginTop: '80px',
        }}>
          {posts.map((post) => {
            return (
              <div key={post.id} style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '10px',
                margin: '10px',
              }}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
            );
          })}
        </div>
    </div>
  )
}

export default Home