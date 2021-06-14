import { APIGatewayProxyEvent } from 'aws-lambda';
import { checkToken } from '../../../../utils/check-token';
import { getRoom } from '../actions/get.action';

export const get = async (event: APIGatewayProxyEvent, _context) => {
  try {
    const { token } = event.headers;
    await checkToken(token);

    const queryParams = event.pathParameters || '';
    if (!queryParams) {
      throw new Error('The body is empty');
    }

    const { roomName } = queryParams;
    if (!roomName) {
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: 'There is a problem with the query params',
          },
          null,
          2,
        ),
      };
    }

    const result = await getRoom(token, roomName);

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
      body: JSON.stringify(result, null, 2),
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
