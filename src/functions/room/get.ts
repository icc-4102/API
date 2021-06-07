import { dynamo } from '@cloudcar-app/aws-tools-lib';
import {APIGatewayProxyEvent} from 'aws-lambda'
import {checkToken} from '../../../utils/check-token'
import {Deck} from '../deck/deck'
import {getRoom} from './actions/get.action'


interface RoomParams {
  roomId: string
  roomName: string
  deck: Deck
  members: string[]
 }

export const get = async (event:APIGatewayProxyEvent, _context) => {
  try {
    const {token} = event.headers
    await checkToken(token)
        
    const queryParams = event.pathParameters || '';
    if (!queryParams) {
      throw new Error("The body is empty");
    }

    const {roomName} = queryParams;
    if(!roomName){
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'There is a problem with the query params'
        }, null, 2),
      }
    }

    const result = await getRoom(roomName);

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
