

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const connectToDb = require('./db')
const {createBlog, getAllBlogs, getBlogById, getBlogsByCategory, deleteBlog, updateBlog, getBlogByUser} = require('./blogControllers')

exports.handler = async (event, context, callback) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
    context.callbackWaitsForEmptyEvenLoop = false

    const body = JSON.parse(event.body)
    await connectToDb()

    const buildResponse = (statusCode, resBody)=>{
        return{
            statusCode: statusCode,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'*'
            },
            body: JSON.stringify(resBody)
        }
    }

    if(event.httpMethod == "POST"){
        try {

            await createBlog(body)

            console.log("After create blog")
            // return{
            //     statusCode: 201,
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Access-Control-Allow-Origin':'*',
            //         'Access-Control-Allow-Methods':'*'
            //     },
            //     body: JSON.stringify({
            //         message: "Blog created"
            //     })
            // }

            return(buildResponse(201, {
                success: true,
                message: "Blog creation successful"
            }))
        } catch (error) {
            let res = buildResponse(500, {
                success: false,
                message: "Blog creation failed",
                error: error.message
            })
            callback(null, res)

        }
    }
    else if(event.httpMethod=="GET"  && event.pathParameters==null  && event.queryStringParameters==null){
        try {
            const blogs = await getAllBlogs()
            return(buildResponse(200, {
                success: true,
                blogs
            }))
        } catch (error) {
            return{
                statusCode: 500,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'*'
                },
                body: JSON.stringify({
                    message: "Blog fetching failed",
                    error: error.message
                })
            }
        }
    }
    else if(event.httpMethod=="GET" && event.requestContext.resourcePath=='/blogs/{blogId}' && event.pathParameters!=null){
        const {blogId} = event.pathParameters;
        try {
            console.log("Params: ",event.pathParameters);
            //console.log("Inside /blogs/{blogId}")
            console.log("Path",event.requestContext)
            const blog = await getBlogById(blogId)
            return(buildResponse(200, {
                success: true,
                blog
            }))
        } catch (error) {
            return(buildResponse(404, {
                success: false,
                error: error
            }))
        }
    }
    else if(event.httpMethod=="GET" && event.requestContext.resourcePath=='/user/{userId}' && event.pathParameters!=null){
        const {userId} = event.pathParameters;
        try {
            console.log("Params: ",event.pathParameters);
            //console.log("Inside /blogs/{blogId}")
            console.log("Path",event.requestContext)
            //const blog = await getBlogById(blogId)
            const blogs = await getBlogByUser(userId)
            return(buildResponse(200, {
                success: true,
                blogs
            }))
        } catch (error) {
            return(buildResponse(404, {
                success: false,
                error: error
            }))
        }
    }
    else if(event.httpMethod=="GET" && event.queryStringParameters.category!=null){
        const category = event.queryStringParameters.category;

        try {
            const blogs = await getBlogsByCategory(category);
            return(buildResponse(200, {
                success: true,
                blogs
            }))
        } catch (error) {
            return(buildResponse(404, {
                success: false,
                error: error
            }))
        }
    }
    else if(event.httpMethod=="DELETE" && event.pathParameters!=null){
        const {blogId} = event.pathParameters;
        try {
            await deleteBlog(blogId)
            return(buildResponse(202, {
                success: true,
                message: "Blog deleted"
            }))
        } catch (error) {
            return(buildResponse(500, {
                success: false,
                error: "Failed to delete blog"
            }))
        }
    }
    else if(event.httpMethod=="PATCH" && event.pathParameters!=null){
        const {blogId} = event.pathParameters;
        try {
            await updateBlog(blogId, body)
            return(buildResponse(202, {
                success: true,
                message: "Blog updated"
            }))
        } catch (error) {
            return(buildResponse(500, {
                success: false,
                error: "Failed to update blog"
            }))
        }
    }
};
