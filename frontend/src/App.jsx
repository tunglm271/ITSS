import { Routes, Route, useNavigate } from 'react-router-dom';
import { createContext, useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthLayout from './layout/AuthLayout';
import ForgotPassword from './pages/ForgotPassword';
export const globalContext = createContext();

function App() {
  const [togglePopup, setTogglePopup] = useState(false);
  const [posts, setPosts] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token khỏi localStorage
    navigate('/login'); // Chuyển hướng đến trang đăng nhập
  };

  return (
    <globalContext.Provider value={{ togglePopup, setTogglePopup, posts, setPosts, handleLogout }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </globalContext.Provider>
  );
}

export default App;