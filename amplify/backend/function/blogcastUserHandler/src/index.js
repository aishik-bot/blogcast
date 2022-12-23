

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk')
const dynamo = new AWS.DynamoDB.DocumentClient() 

exports.handler = async (event, context, callback) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);
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

    const getUserBlogs = async (params)=>{
        try {
            const blogs = await dynamo.query(params).promise();
            return blogs
        } catch (error) {
            return error
        }
    }

    if(event.httpMethod=="GET" && event.pathParameters!=null){
        const {userId} = event.pathParameters;

        const params = {
            TableName: 'blogtable-dev',
            IndexName: 'user-index',
            KeyConditionExpression: '#userid = :uid',
            ExpressionAttributeNames: {
                '#userid': 'user'
            },
            ExpressionAttributeValues: {
                ':uid' : userId
            }
        }

        try {
            console.log(`inside /user/${userId}`)
            const blogs = await getUserBlogs(params)
            let res = buildResponse(200, blogs)
            callback(null, res)
        } catch (error) {
            console.log("Get user blogs error: ", error)
        }
    }
};
