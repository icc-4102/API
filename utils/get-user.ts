import { DynamoDB } from 'aws-sdk';

const dynamo = process.env.LOCAL
  ? new DynamoDB({ region: 'localhost', endpoint: 'http://localhost:8000' })
  : new DynamoDB({ region: process.env.REGION || 'us-east-1' });

const documentClient = new DynamoDB.DocumentClient({ service: dynamo });

interface UserParams {
  id: string;
  username: string;
  name: string;
}

export const getUserByToken = async (token) => {
  try {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: 'icc4220-user-table',
      FilterExpression: '#user_token = :user_token_val',
      ExpressionAttributeNames: {
        '#user_token': 'token',
      },
      ExpressionAttributeValues: { ':user_token_val': token },
    };
    const result = await documentClient.scan(params).promise();
    if (result.Items[0]) {
      const user = result.Items[0];
      return user as UserParams;
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (userId) => {
  try {
    const params: DynamoDB.DocumentClient.ScanInput = {
      TableName: 'icc4220-user-table',
      FilterExpression: '#user_id = :user_id_val',
      ExpressionAttributeNames: {
        '#user_id': 'id',
      },
      ExpressionAttributeValues: { ':user_id_val': userId },
    };
    const result = await documentClient.scan(params).promise();
    if (result.Items[0]) {
      const user = result.Items[0] as UserParams;
      const { username, name, id } = user;
      return { id, username, name };
    }
  } catch (error) {
    console.log(error.message);
  }
};
