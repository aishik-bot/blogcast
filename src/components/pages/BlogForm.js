import React from 'react'
import { API } from 'aws-amplify';
import { useFormik } from 'formik';

function BlogForm({user}) {

    const formik = useFormik({
        enableReinitialize: true,
        initialValues:{
          user: user&&user.username,
          title: '',
          category: '',
          content: ''
        },
        onSubmit: async (values, {resetForm})=>{
          try {
            await postBlog(values)
            alert("Blog posted successfully")
            console.log("blog: ", values);
            resetForm()
          } catch (error) {
            console.log(error)
          }
        }
    });
    const postBlog = async (values)=>{
        try {
          const token = user.signInUserSession.idToken.jwtToken;
          console.log({token});
          const requestInfo = {
            headers: {
              Authorization: token
            },
            body:{
              user: user&&user.username,
              title: values.title,
              category: values.category,
              content: values.content
            }
          }
          await API.post('blogcastapi','/blogs',requestInfo);
        } catch (error) {
          console.log("Erro in post blog", error)
          return error
        }
    }
  return (
    <>
        <div className='blog-form'>
            <h1>Write a Blog</h1>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" value={formik.values.title} onChange={formik.handleChange}/><br/>

                <label htmlFor="category">Category: </label>
                <select name="category" id="category" value={formik.values.category} onChange={formik.handleChange}>
                  <option value="" disabled hidden>Select a category</option>
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
        </div>
    </>
  )
}

export default BlogForm