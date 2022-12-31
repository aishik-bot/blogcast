import React from 'react'
import { API } from 'aws-amplify';
import { useFormik } from 'formik';
import { Storage } from 'aws-amplify';

Storage.configure({
  AWSS3: {
    bucket: 'blogcastblogs152312-dev',
    region: 'us-east-1',
    level: 'private'
    // acl: 'public-read'
  }
})

function BlogForm({user}) {

    const formik = useFormik({
        enableReinitialize: true,
        initialValues:{
          user: user&&user.username,
          title: '',
          category: '',
          content: '',
          coverImg: ''
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
    const uploadImg = async(file)=>{
      try {
        console.log({file})
        const {key} = await Storage.put(`${formik.values.user}-${formik.values.title}.jpg`, file, {
          contentType: 'image/jpg'
        })
        console.log("s3 key: ", key)
        formik.setFieldValue("coverImg", key)
        console.log(formik.values.coverImg)
        // const img_url = await Storage.get(key)
        // console.log(img_url)

      } catch (error) {
        console.log("Error uploading image: ", error)
      }
    }
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
              content: values.content,
              coverImg: values.coverImg
            }
          }
          await API.post('blogcastapi','/blogs',requestInfo);
        } catch (error) {
          console.log("Error in post blog", error)
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

                <label id="cover-photo">Cover Photo: </label>
                <input type="file" id="cover-photo" accept="image/jpg" onChange={(e)=>uploadImg(e.target.files[0])}/><br/>
                <button type="submit">Post Blog</button>
            </form>
        </div>
    </>
  )
}

export default BlogForm