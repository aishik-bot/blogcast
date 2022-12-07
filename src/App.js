import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Travel from "./components/pages/Travel";
import './App.css'
import Business from "./components/pages/Business";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/travel" element={<Travel/>}/>
          <Route path="/business" element={<Business/>}/>
        </Routes>
      </BrowserRouter>      
    </>
  );
}

export default App;
