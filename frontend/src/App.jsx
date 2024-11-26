import { Routes, Route } from 'react-router-dom'
import { createContext, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'

export const globalContext = createContext();

function App() {
  const [ togglePopup, setTogglePopup ] = useState(false)

  return (
    <globalContext.Provider value={{togglePopup, setTogglePopup}}>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </globalContext.Provider>
  )
}

export default App;
