import React, {useState, useEffect} from 'react'
import '@aws-amplify/ui-react/styles.css'
import { Auth, API } from 'aws-amplify';
import {signOut} from '../../util/apiCall'
import { useNavigate } from 'react-router-dom';
import BlogForm from './BlogForm';
import UserBlogs from './UserBlogs';


function MyBlogs() {
  const [user, setUser] = useState();
  const [writeToggle, setWriteToggle] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    getUser();
  }, []);
  
  const getUser = async()=>{
    try {
      console.log("inside get user")
      const userInfo = await Auth.currentAuthenticatedUser();
      setUser(userInfo)
    } catch (error) { 
      console.log(error)
    }
  }

  
  const signOutUser = async()=>{
    try {
      await signOut();
      alert("User Signed out successfully")
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }
  
  
  
  
  return (
    <>
          {user&&<div>
              <button onClick={signOutUser}>Sign Out</button>
              <h3>Hi {user.attributes.preferred_username}</h3>
              {writeToggle?
                <>
                  <button onClick={()=>{setWriteToggle(false)}}>Close</button>
                  <BlogForm user={user}/>
                </>
                :<button onClick={()=>{setWriteToggle(true)}}>Write a blog</button>
              }
              <h1>My Blogs</h1>
              <UserBlogs user={user}/>
          </div>}
    </>
  )
}

export default MyBlogs