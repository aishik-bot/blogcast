import { API, Auth } from 'aws-amplify';
import React,{useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './BlogDetails.css'

function BlogDetails() {
    const {blogId} = useParams();
    const [blog, setBlog] = useState();
    const [currentUser, setCurrentUser] = useState();

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
            console.log("blog details",blog)
            setBlog(blogData)
        } catch (error) {
            console.log("Error in blog details fetchBlog", error)
        }
    }

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
            {currentUser==blog[0].user?
                <div>
                    <button>Edit</button>
                    <button onClick={deleteBlog}>Delete</button>
                </div>
                :null
            }
            <h1 style={{margin: "5px 0"}}>{blog[0].title}</h1>
            <h4 style={{color: "grey", margin: "0"}}>{blog[0].category}</h4>
            <h3>by <span style={{fontStyle: "italic"}}>{blog[0].user}</span></h3>
            <img className='featured-img' src='https://www.indeftts.com/wp-content/uploads/2019/08/placeholder.gif'/>
            <p>{blog[0].content}</p>
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