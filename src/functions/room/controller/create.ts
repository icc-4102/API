import {APIGatewayProxyEvent} from 'aws-lambda'
import {checkToken} from '../../../../utils/check-token'
import { createRooms } from '../actions/create.action'
import * as yup from 'yup';
 
const createRoomSchema = yup.object().shape({
  roomName: yup.string().required(),
  password: yup.string().required(),
  deck: yup.object().shape({
    name: yup.string().required(),
    cards: yup.array().of(yup.string().required())
  })
});

export const create = async (event: APIGatewayProxyEvent, _context) => {
  
  try {
    const {token} = event.headers
    await checkToken(token)
        
    const body = event.body;
    if (!body) {
      throw new Error("The body is empty");
    }

    const parsedBody = JSON.parse(body);

    await createRoomSchema
      .validate(parsedBody, { abortEarly: false })
      .catch((error) => {
        throw new Error(error.errors);
      });

    const result = await createRooms(parsedBody, token)

    if (result === null) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'the roomId  is not valid'
        }, null, 2),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({
          result
        }, null, 2),
      };
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
