/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_DYNAMOA83BD4DD_ARN
	STORAGE_DYNAMOA83BD4DD_NAME
	STORAGE_DYNAMOA83BD4DD_STREAMARN
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'});



exports.handler = async (event, context, callback) => {
    const body = JSON.parse(event.body)
    
    const buildResponse = (statusCode, body)=>{
        return{
            statusCode: statusCode,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'*'
            },
            body: JSON.stringify(body)
        }
    }
    const createBlog = async (params)=>{
        try {
            console.log("inside createblog function try block")
            const dbRes = await dynamo.put(params).promise();
            console.log(params.Item)
            console.log("Promise returned")
            console.log(dbRes)
        } catch (error) {
            console.log("error in creating item in dynamodb", error);
            return error;
        }
    }
    
    const getBlogList= async ()=>{
        try {
            const data = await dynamo.scan({TableName: "blogtable-dev"}).promise()
            return data;
        } catch (error) {
            console.log("getbloglist error: ", error)
            return error
        }
    }

    const getBlogsByParams = async (params)=>{
        try {
            const blogs = await dynamo.query(params).promise()
            return blogs;
        } catch (error) {
            console.log("blogs category", error)
            return error
        }
    }

    const deleteBlog = async (params)=>{
        try {
            console.log("Inside deleteBlog function")
            const delRes = await dynamo.delete(params).promise()
            console.log(delRes)
            return delRes;
        } catch (error) {
            return error
        }
    }

    const updateBlog = async (params)=>{
        try {
            console.log("Inside updateBlog")
            const updateRes = await dynamo.update(params).promise()
            console.log(updateRes)
            return updateRes
        } catch (error) {
            return error
        }
    }

    
    if(event.httpMethod=="GET" && event.pathParameters==null  && event.queryStringParameters==null){
        try {
            console.log("Inside /blogs")
            const blogs = await getBlogList()
            let res = buildResponse(200, {blogs})
            callback(null, res)
        } catch (error) {
            console.log("GET error", error)
        }
    }
    else if(event.httpMethod=="GET" && event.pathParameters!=null){
        const {blogId} = event.pathParameters; 
        const params = {
            TableName: 'blogtable-dev',
            //IndexName: 'category-index',
            // FilterExpression: 'category = :cat',
            // ExpressionAttributeNames: {
            //     '#cat': 'category',
            // },
            KeyConditionExpression: `id = :id`,
            ExpressionAttributeValues: {
                ':id': blogId,
            },
            // projectionExpression: 'category',
            // ExpressionAttributesNames: {
            //     'category': 'category'
            // },
            // ExpressionAttributesValues:{
            //     ":c": {
            //         'S': "travel"
            //     }
            // }
            // queryKey: 'category',
            // queryValue: category
            // Key: {
            //     category: 'Travel'
            // }
        }
        try {
            console.log("Params: ",event.pathParameters);
            console.log("Inside /blogs/{blogId}")

            const blog = await getBlogsByParams(params)
            let res = buildResponse(200, blog.Items)
            callback(null, res)
        } catch (error) {
            console.log("GET category error: ", error)
        }
    }
    else if(event.httpMethod=="GET" && event.queryStringParameters.category!=null){
        const category = event.queryStringParameters.category;
        const params = {
            TableName: 'blogtable-dev',
            IndexName: 'category-index',
            KeyConditionExpression: `category = :c`,
            ExpressionAttributeValues: {
                ':c': category,
            },
        }

        try {
            console.log("Params: ",event.queryStringParameters);
            const blogs = await getBlogsByParams(params)
            let res = buildResponse(200, {blogs})
            callback(null, res)
        } catch (error) {
            console.log("GET category error: ", error)
        }
    }
    else if(event.httpMethod=="POST"){
        const params = {
            TableName : 'blogtable-dev',
            Item: {
                id: context.awsRequestId,
                user: body.user,
                title: body.title,
                category: body.category,
                content: body.content
            }
        }
        try {
            await createBlog(params)
            let res = buildResponse(201, [{"message": "New Blog created successfully"}])
            callback(null, res)
        } catch (error) {
            console.log("POST error", error)
        }
    }
    else if(event.httpMethod=="DELETE" && event.pathParameters!=null){
        const {blogId} = event.pathParameters;
        const params = {
            TableName: 'blogtable-dev',
            Key: {
                id: blogId.toString()
            }
        }
        try {
            console.log(`Inside delete /blogs/${blogId}`)
            await deleteBlog(params)
            let res = buildResponse(202, {message: `Blog ${blogId} deleted`})
            callback(null, res)
        } catch (error) {
            console.log("DELETE error", error)
        }
    }
    else if(event.httpMethod=="PATCH" && event.pathParameters!=null){
        const {blogId} = event.pathParameters;
        const params = {
            TableName: 'blogtable-dev',
            Key:{
                id: blogId
            },
            UpdateExpression: "SET title = :title, category = :category, content = :content",
            ExpressionAttributeValues: {
                ":title" : body.title,
                ":category": body.category,
                ":content" : body.content 
            }
        }

        try {
            console.log(`Inside update /blogs/${blogId}`)
            await updateBlog(params)
            let res = buildResponse(202, {
                message: `Blog ${blogId} updated`
            })
            callback(null, res)
        } catch (error) {
            console.log("Error in update item: ", error)
        }
    }
    else{
            let res = buildResponse(404, [{"message": "Invalid method hit"}])
            callback(null, res);
    }
    
};
