import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import './App.css'
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import MyBlogs from "./components/pages/MyBlogs";
import SignUp from "./components/auth/SignUp";
import ConfirmSignUp from "./components/auth/ConfirmSignUp";
import AuthLayout from "./components/auth/AuthLayout";
import BlogCategory from "./components/pages/BlogCategory";
import BlogDetails from "./components/pages/BlogDetails";

function App() {
  return (
    <>      
      <BrowserRouter>
        <Navbar/>
        <AuthLayout>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signUp" element={<SignUp/>}/>
            <Route path="/confirm-signup" element={<ConfirmSignUp/>}/>


            <Route path="/travel" element={<BlogCategory category='Travel'/>}/>
            <Route path="/business" element={<BlogCategory category='Business'/>}/>
            <Route path="/sports" element={<BlogCategory category='Sports'/>}/>
            <Route path="/entertainment" element={<BlogCategory category='Entertainment'/>}/>
            <Route path="/blogs/:blogId" element={<BlogDetails/>}/>
            <Route path="/my-blogs" element={<MyBlogs/>}/>
          </Routes>
        </AuthLayout>
      </BrowserRouter>      
    </>
  );
}

export default App;
