import { API } from 'aws-amplify';
import React, {useState, useEffect} from 'react'
import BlogCard from './BlogCard';
import './BlogCategory.css'

function BlogCategory({category}) {
    const [blogs, setblogs] = useState([]);

    useEffect(() => {
        fetchBlogs()
        console.log("useEffect running")
    }, [category]);

    const fetchBlogs = async ()=>{
        try {
            const path = category.toLowerCase()
            const bloglist = await API.get('blogcastapi', `/blogs?category=${path}`)
            console.log("Blogs fetched successfully")
            console.log({bloglist})
            setblogs(bloglist.blogs.Items)
        } catch (error) {
            console.log("Error in fetch blogs", error)
        }
    }
  return (
    <>
        <h1>{category}</h1>
        <div className='card-container'>
            {blogs.length?blogs.map((blog, index)=>(
                <div key={index} className='card-column'>
                    <BlogCard blog = {blog}/>
                </div>
            )):<h3>No blogs posted in this category</h3>}
        </div>
    </>
  )
}

export default BlogCategory