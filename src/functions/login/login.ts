import * as yup from 'yup';
import { dynamo } from '@cloudcar-app/aws-tools-lib';


const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required()
});

interface UserParams {
  id: string
  username: string
  name: string
  password: string
  token: string
 }

export const login = async (event, _context) => {
  try {
    const body = event.body || '';
    if (!body) {
      throw new Error("The body is empty");
    }

    const parsedBody = JSON.parse(body);

    await loginSchema
      .validate(parsedBody, { abortEarly: false })
      .catch((error) => {
        throw new Error(error.errors);
      });
    const { username, password} = parsedBody


    const params = {
      TableName: "icc4220-user-table",
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username,
      },
      ConsistentRead: true,
    };
    const result = await dynamo.getItem(params) as UserParams;

    if (result === null) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'User or password not valid'
        }, null, 2),
      };
    } else {
      if (result.password === password) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            user_id: result.id,
            token: result.token
          }, null, 2),
        };
      } else {
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: 'User or password not valid'
          }, null, 2),
        }
     
      }
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Problem with the request'
      }, null, 2),
    };
  }
  
}