import React, {useState, useEffect} from 'react'
import '@aws-amplify/ui-react/styles.css'
import { Auth } from 'aws-amplify';
import {signOut} from '../../util/apiCall'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

function MyBlogs() {
  const [user, setUser] = useState();
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
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues:{
      user: user&&user.username,
      title: '',
      category: '',
      content: ''
    },
    onSubmit: (values, {resetForm})=>{
      try {
        alert("Blog posted successfully")
        console.log("blog: ", values);
        resetForm()
      } catch (error) {
        console.log(error)
      }
    }
  });
  
  return (
    <>
          {user&&<div>
              <button onClick={signOutUser}>Sign Out</button>
              <h1>My Blogs</h1>
              <h3>Hi {user.attributes.preferred_username}</h3>
              <h2>Write a Blog</h2>
              <form onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" value={formik.values.title} onChange={formik.handleChange}/><br/>

                <label htmlFor="category">Category: </label>
                <select name="category" id="category" value={formik.values.category} onChange={formik.handleChange}>
                  <option value="" selected disabled hidden>Select a category</option>
                  <option value="travel">Travel</option>
                  <option value="business">Business</option>
                  <option value="sports">Sports</option>
                  <option value="entertainment">Entertainment</option>
                </select><br/>

                <label id="content">Content:</label>
                <textarea id="content" rows="4" cols="100" value={formik.values.content} onChange={formik.handleChange}/>
                <br/>
                <button type="submit">Post Blog</button>
              </form>
              {/* <button onClick={signOut}>Sign Out</button> */}
          </div>}
    </>
  )
}

export default MyBlogs