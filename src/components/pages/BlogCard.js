import { Storage } from 'aws-amplify';
import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import './BlogCard.css'

function BlogCard({blog}) {
  const [img, setimg] = useState();
  useEffect(() => {
    //fetchImgUrl()
  }, []);

  const fetchImgUrl = async () => {
    try {
      const coverImg = await Storage.get(blog.coverImg)
      console.log(coverImg)
      setimg(coverImg)
    } catch (error) {
      console.log("Error i fetching image: ", error)
    }
  }
  return (
    <div className='blog-card'>
        <img className='card-img' src={img}/>
        <h3>{blog.title}</h3>
        <h5>by {blog.user}</h5>
        <div>
            <p>{blog.content.slice(0,100)}...</p>
        </div>
        <NavLink to={"/blogs/"+blog._id}>Read more</NavLink>
    </div>
  )
}

export default BlogCard