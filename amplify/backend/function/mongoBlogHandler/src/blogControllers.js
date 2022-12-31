const Blog = require('./blog.model');

const createBlog = async (body)=>{
    const {title, category, content, user, coverImg} = body;
    try {
        console.log("Inside createBlog", body)
        await Blog.create({
            title: title,
            category: category,
            content: content,
            user: user,
            coverImg: coverImg
        })

        console.log("Inside createBlog: Blog creation successful!")
        return 
    } catch (error) {
        throw error
    }
}

const getAllBlogs = async ()=>{
    try {
        const blogs = await Blog.find()
        console.log("Blogs fetched", blogs)
        return blogs
    } catch (error) {
        throw error
    }
}

const getBlogById = async (id)=>{
    try {
        const blog = await Blog.findById(id)
        if(blog)
            return blog
        else throw "Blog not found"
    } catch (error) {
        throw error
    }
}

const getBlogsByCategory = async (category) => {
    try {
        const blogs = await Blog.find({category})
        return blogs
    } catch (error) {
        throw error
    }
}

const deleteBlog = async (id) => {
    try {
      await Blog.findByIdAndDelete(id)
      return "success"  
    } catch (error) {
        throw error
    }
}

const updateBlog = async (id, body) => {
    try {
        await Blog.findByIdAndUpdate(id, body)
        return
    } catch (error) {
        throw error
    }
}

const getBlogByUser = async (userId) => {
    try {
        const blogs = await Blog.find({user: userId})
        return blogs
    } catch (error) {
        throw error
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    getBlogsByCategory,
    deleteBlog,
    updateBlog,
    getBlogByUser
}