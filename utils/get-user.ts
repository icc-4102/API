import { DynamoDB } from 'aws-sdk';

const dynamo = process.env.LOCAL
  ? new DynamoDB({ region: 'localhost', endpoint: 'http://localhost:8000' })
  : new DynamoDB({ region: process.env.REGION || 'us-east-1' });

const documentClient = new DynamoDB.DocumentClient({ service: dynamo });

interface UserParams {
    id: string
    username: string
    name: string
   }

export const getUserByToken = async (token) => {
    console.log
    try {
        const params = {
            TableName: "icc4220-user-table",
            FilterExpression: "#ee970 = :ee970",
            ConsistentRead: false,
            ExpressionAttributeNames: { "#ee970":"token"},
            ExpressionAttributeValues: {":ee970": {"S":token}}
        };
        console.log(params)
        const result = await documentClient.scan(params).promise()
        console.log('result',result)
        if (result.Items[0]) {
            const user = result.Items[0]
            return user as UserParams
        }
    } catch (error) {
        console.log(error.message)   
    }
}