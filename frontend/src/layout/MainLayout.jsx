import { Outlet } from 'react-router-dom';
import Background from "../components/Background";
import Sidebar from "../components/Sidebar"
import './AuthLayout.css';
import { globalContext } from "../App";
import { useContext } from 'react';
import CreatePostPopUp from "../components/CreatePostPopUp";

function MainLayout() {

  const { togglePopup, setTogglePopup } = useContext(globalContext);
  return (
    <div style={{padding: 0}}>

        <Background />
        
        <Sidebar />
        <Outlet />

        <CreatePostPopUp  open={togglePopup} onClose={() => setTogglePopup(false)}/>        
    </div>
  );
}

export default MainLayout;