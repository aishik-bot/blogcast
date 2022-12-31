import { API } from 'aws-amplify';
import React, {useState, useEffect} from 'react';
import BlogCard from './BlogCard';
import './BlogCard.css'

function UserBlogs({user}) {
    const [blogs, setBlogs] = useState();
    useEffect(() => {
        fetchBlogs()
    }, []);

    const fetchBlogs = async ()=>{
        try {
            const token = user.signInUserSession.idToken.jwtToken;
            console.log({token});
            const requestInfo = {
                headers: {
                Authorization: token
                }
            }
            const blogList = await API.get('blogcastapi', `/user/${user.username}`, requestInfo)
            setBlogs(blogList.blogs)
            console.log(blogs)
        } catch (error) {
            console.log("Error in userblogs fetchblogs:", error)
        }
    }
  return (
    <> 
        <div className='card-container'>
            {blogs?blogs.map((blog, index)=>(
                    <div key={index} className='card-column'>
                        <BlogCard blog = {blog}/>
                    </div>
                )):<h1>Not present</h1>}
        </div>
    </>
  )
}

export default UserBlogs