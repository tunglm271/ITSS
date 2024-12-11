import { Routes, Route } from 'react-router-dom'
import { createContext, useState } from 'react'
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuthLayout from './layout/AuthLayout';
import ForgotPassword from './pages/ForgotPassword';
import { Navigate } from 'react-router-dom';
import PostDetails from './pages/PostDetails';
import MainLayout from './layout/MainLayout';
export const globalContext = createContext();

function App() {
  const [ togglePopup, setTogglePopup ] = useState(false)
  const [posts , setPosts] = useState();

  const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
  };

  return (
    <globalContext.Provider value={{togglePopup, setTogglePopup, posts , setPosts}}>
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </globalContext.Provider>
  )
}
// <Route path="/posts/:id" element={<PostDetails />} />
export default App;
