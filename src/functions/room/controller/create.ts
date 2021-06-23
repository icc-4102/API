import { APIGatewayProxyEvent } from 'aws-lambda';
import * as yup from 'yup';
import { checkToken } from '../../../../utils/check-token';
import { createRooms } from '../actions/create.action';

const createRoomSchema = yup.object().shape({
  roomName: yup.string().required(),
  password: yup.string().required(),
  deck: yup.object().shape({
    name: yup.string().required(),
    cards: yup.array().of(yup.string().required()),
  }),
});

export const create = async (event: APIGatewayProxyEvent) => {
  try {
    const { token } = event.headers;
    await checkToken(token);

    const { body } = event;
    if (!body) {
      throw new Error('The body is empty');
    }

    const parsedBody = JSON.parse(body);

    await createRoomSchema
      .validate(parsedBody, { abortEarly: false })
      .catch((error) => {
        throw new Error(error.errors);
      });

    const result = await createRooms(parsedBody, token);
    console.log('result', result);
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
          message: 'La sala se a creado con exito',
          roomId: result.roomId,
          roomName: result.roomName,
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
          message: err.message,
        },
        null,
        2,
      ),
    };
  }
};
