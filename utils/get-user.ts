import {dynamo} from '@cloudcar-app/aws-tools-lib'

interface UserParams {
    id: string
    username: string
    name: string
   }

export const getUserByToken = async (token) => {
    try {
        const params = {
            TableName: "icc4220-user-table",
            KeyConditionExpression: 'token = :token',
            ExpressionAttributeValues: {
              ':token': token,
            },
            ConsistentRead: true,
          };
          const {id,username,name} = await dynamo.getItem(params) as UserParams;
          return {id,username,name}
    } catch (error) {
        console.log(error.message)
    }
}