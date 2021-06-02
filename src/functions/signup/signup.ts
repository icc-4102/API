import { APIGatewayEvent } from 'aws-lambda';
import * as yup from 'yup';
import { v4 as uuidV4 } from 'uuid';
import { dynamo } from '@cloudcar-app/aws-tools-lib';


const signupSchema = yup.object().shape({
  username: yup.string().required(),
  name: yup.string().required(),
  password: yup.string().required()
});

interface UserParams {
  id: string
  username: string
  name: string
  password: string
  token: string
 }

export const signup = async (event, _context) => {
  try {
    const body = event.body || '';
    if (!body) {
      throw new Error("The body is empty");
    }

    const parsedBody = JSON.parse(body);

    await signupSchema
      .validate(parsedBody, { abortEarly: false })
      .catch((error) => {
        throw new Error(error.errors);
      });
    const userParams = {
      id: uuidV4(),
      ...parsedBody,
      token: uuidV4()
    } as UserParams


    const params = {
      TableName: "icc4220-user-table",
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': userParams.username,
      },
      ConsistentRead: true,
    };
    const result = await dynamo.getItem(params);
    console.log('El resultado', result)
    if (result !== null) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'The user already exist'
        }, null, 2),
      };
    } else {
      const params = {
        TableName: "icc4220-user-table",
        Item: userParams,
      };
      const item = (await dynamo.createItem(params)) as UserParams;
     
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: 'El usuario fue creado exitosamente',
          user_id: item.id,
          token: item.token
        }, null, 2),
      };
    };

   
  } catch (err) {
    console.log(err)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Problem with the request'
      }, null, 2),
    };
  }
  
}
