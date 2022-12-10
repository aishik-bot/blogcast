import React, {useState, useEffect} from 'react'
import '@aws-amplify/ui-react/styles.css'
import { Auth } from 'aws-amplify';
import {signOut} from '../../util/apiCall'
import { useNavigate } from 'react-router-dom';

function MyBlogs() {
  const [user, setUser] = useState();
  const navigate = useNavigate()
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async()=>{
    try {
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
              <h1>My Blogs</h1>
              <h3>Hi {user.attributes.preferred_username}</h3>
              <h2>Write a Blog</h2>
              <form>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title"/><br/>

                <label htmlFor="category">Category: </label>
                <select name="category" id="category">
                  <option value="travel">Travel</option>
                  <option value="business">Business</option>
                  <option value="sports">Sports</option>
                  <option value="entertainment">Entertainment</option>
                </select><br/>

                <label id="content">Content:</label>
                <textarea id="content" rows="4" cols="100"/>

                <button type="submit">Post Blog</button>
              </form>
              {/* <button onClick={signOut}>Sign Out</button> */}
          </div>}
    </>
  )
}

export default MyBlogs