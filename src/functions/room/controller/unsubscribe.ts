import {APIGatewayProxyEvent} from 'aws-lambda'
import {checkToken} from '../../../../utils/check-token'
import { unsubscribeRoom } from '../actions/unsubscribe.action'
import * as yup from 'yup';

const unsubscribeRoomSchema = yup.object().shape({
  name: yup.string().required(),
  roomId: yup.string().required()
});


export const unsubscribe = async (event:APIGatewayProxyEvent, _context) => {
  try {
    const {token} = event.headers
    await checkToken(token)
    const body = event.body;
    if (!body) {
      throw new Error("The body is empty");
    }

    const parsedBody = JSON.parse(body);

    await unsubscribeRoomSchema
      .validate(parsedBody, { abortEarly: false })
      .catch((error) => {
        throw new Error(error.errors);
      });
    
    const { roomId } = parsedBody
    
    const result = await unsubscribeRoom(token,roomId);

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
