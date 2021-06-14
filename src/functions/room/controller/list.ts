import { APIGatewayProxyEvent } from 'aws-lambda';
import { checkToken } from '../../../../utils/check-token';
import { listRooms } from '../actions/list.action';

export const list = async (event: APIGatewayProxyEvent, _context) => {
  try {
    const { token } = event.headers;
    await checkToken(token);

    const result = await listRooms(token);

    if (result === null) {
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: 'the roomId  is not valid',
          },
          null,
          2,
        ),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          rooms: result,
        },
        null,
        2,
      ),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(
        {
          message: 'Problem with the request',
        },
        null,
        2,
      ),
    };
  }
};
