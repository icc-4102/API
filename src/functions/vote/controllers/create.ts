import { APIGatewayProxyEvent } from 'aws-lambda';
import * as yup from 'yup';
import { checkToken } from '../../../../utils/check-token';
import { voteRoom } from '../actions/create.action';

const voteSchema = yup.object().shape({
  roomName: yup.string().required(),
  vote: yup.string().required(),
});

export const createVote = async (event: APIGatewayProxyEvent) => {
  try {
    const { token } = event.headers;
    await checkToken(token);

    const { body } = event;
    if (!body) {
      throw new Error('The body is empty');
    }

    const parsedBody = JSON.parse(body);

    await voteSchema
      .validate(parsedBody, { abortEarly: false })
      .catch((error) => {
        throw new Error(error.errors);
      });

    const result = await voteRoom(token, parsedBody);
    if (result === null) {
      return {
        statusCode: 400,
        body: JSON.stringify(
          {
            message: 'the room is not valid',
          },
          null,
          2,
        ),
      };
    }
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'La votación fue realizada' }, null, 2),
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
