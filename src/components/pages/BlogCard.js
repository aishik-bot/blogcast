import React from 'react'
import { NavLink } from 'react-router-dom'
import './BlogCard.css'

function BlogCard({blog}) {
  return (
    <div className='blog-card'>
        <img className='card-img' src='https://www.indeftts.com/wp-content/uploads/2019/08/placeholder.gif'/>
        <h3>{blog.title}</h3>
        <h5>by {blog.user}</h5>
        <div>
            <p>{blog.content.slice(0,100)}...</p>
        </div>
        <NavLink to={"/blogs/"+blog.id}>Read more</NavLink>
    </div>
  )
}

export default BlogCard