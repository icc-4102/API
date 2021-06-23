import { APIGatewayProxyEvent } from 'aws-lambda';
import * as yup from 'yup';
import { checkToken } from '../../../../utils/check-token';
import { saveLocation } from '../actions/save.action';

const saveLocationSchema = yup.object().shape({
  roomName: yup.string().required(),
  lat: yup.string().required(),
  long: yup.string().required(),
});

export const save = async (event: APIGatewayProxyEvent) => {
  try {
    const { token } = event.headers;
    await checkToken(token);

    const { body } = event;
    if (!body) {
      throw new Error('The body is empty');
    }

    const parsedBody = JSON.parse(body);

    await saveLocationSchema
      .validate(parsedBody, { abortEarly: false })
      .catch((error) => {
        throw new Error(error.errors);
      });

    const result = await saveLocation(parsedBody, token);
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
          message: 'La ubicación se guardo correctamente',
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
