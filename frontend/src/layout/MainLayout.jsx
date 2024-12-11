import { Outlet } from 'react-router-dom';
import Background from "../components/Background";
import Sidebar from "../components/Sidebar"
import './AuthLayout.css';
function AuthLayout() {
  return (
    <div style={{padding: 0}}>

        <Background />
        
        <Sidebar />
        <Outlet />
    </div>
  );
}

export default AuthLayout;