import { API, Auth } from 'aws-amplify';
import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik';
import './BlogDetails.css'

function BlogDetails() {
    const {blogId} = useParams();
    const [blog, setBlog] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [updateToggle, setUpdateToggle] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getUser()
        fetchBlog()
    }, []);

    const getUser = async()=>{
        try {
          console.log("inside get user")
          const userInfo = await Auth.currentAuthenticatedUser();
          setCurrentUser(userInfo.username)
        } catch (error) { 
          console.log(error)
        }
    }

    const deleteBlog = async ()=>{
        try {
            console.log("inside delete blog function")
            await API.del('blogcastapi', `/blogs/${blogId}`)
            alert(`Blog ${blogId} deleted successfully`)
            navigate(-1)
        } catch (error) {
            console.log("error in deleting blog", error)
        }
    }

    const fetchBlog = async ()=>{
        try {
            console.log("blogId: ", blogId)
            const blogData = await API.get('blogcastapi', `/blogs/${blogId}`);
            console.log("blogData: ", blogData)
            setBlog(blogData)
            console.log("blog details",blog)
        } catch (error) {
            console.log("Error in blog details fetchBlog", error)
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues:{
          title: '',
          category: '',
          content: ''
        },
        onSubmit: async (values, {resetForm})=>{
          try {
            await API.patch('blogcastapi', `/blogs/${blogId}`, {
                body: {
                title: values.title,
                category: values.category,
                content: values.content}
            })
            alert("Details updated successfully")
            console.log("blog: ", values);
            resetForm()
            setUpdateToggle(false)
            fetchBlog()
          } catch (error) {
            console.log(error)
          }
        }
    });

    // const getUsername = async ()=>{
    //     try {
    //         const user = 
    //     } catch (error) {
    //         console.log("Error inside getUsername", error)
    //     }
    // }

  if(blog)
  return (
    <>
        <div className='blog-container'>
            {currentUser==blog.blog.user?
                <div>
                    {updateToggle?
                        <>
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
                                <button type="submit">Update</button>
                            </form>
                            <button onClick={()=>setUpdateToggle(false)}>cancel</button>
                        </>
                        :<>
                            <button onClick={()=>setUpdateToggle(true)}>Edit</button>
                            <button onClick={deleteBlog}>Delete</button>
                        </>
                    }
                </div>
                :null
            }
            <h1 style={{margin: "5px 0"}}>{blog.blog.title}</h1>
            <h4 style={{color: "grey", margin: "0"}}>{blog.blog.category}</h4>
            <h3>by <span style={{fontStyle: "italic"}}>{blog.blog.user}</span></h3>
            <img className='featured-img' src={blog.blog.coverImg}/>
            <p>{blog.blog.content}</p>
        </div>
    </>
  )
  else
  return(
    <>
        <h1>Loading...</h1>
    </>
  )
}

export default BlogDetails