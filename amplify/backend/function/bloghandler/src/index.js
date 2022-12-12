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
const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    
    const params = {
        TableName : 'blogtable',
        Item: {
            id: context.awsRequestId,
            user: event.body.user,
            title: event.body.title,
            category: event.body.category,
            content: event.body.content
        }
    }

    const createBlog = async ()=>{
        try {
            console.log("inside createblog function try block")
            await dynamo.put(params).promise();
            console.log("Promise returned")
        } catch (error) {
            console.log("error in creating item in dynamodb", error);
            return error;
        }
    }
    
    console.log(`EVENT: ${JSON.stringify(event)}`);
    try {
        await createBlog()
        return {
            statusCode: 201,
        //  Uncomment below to enable CORS requests
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            }, 
            body: JSON.stringify("New Blog added!"),
        };
    } catch (error) {
        console.log("error occured inside event handler",error)
    }
    
};
