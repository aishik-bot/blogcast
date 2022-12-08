import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Travel from "./components/pages/Travel";
import './App.css'
import Business from "./components/pages/Business";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import MyBlogs from "./components/pages/MyBlogs";
import SignUp from "./components/auth/SignUp";
import ConfirmSignUp from "./components/auth/ConfirmSignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/confirm-signup" element={<ConfirmSignUp/>}/>
          <Route path="/travel" element={<Travel/>}/>
          <Route path="/business" element={<Business/>}/>
          <Route path="/my-blogs" element={<MyBlogs/>}/>
        </Routes>
      </BrowserRouter>      
    </>
  );
}

export default App;
