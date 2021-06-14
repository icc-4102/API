import { dynamo } from '@cloudcar-app/aws-tools-lib';
import { v4 as uuidV4 } from 'uuid';
import { getUserByToken } from '../../../../utils/get-user';

export const createRooms = async (room, token) => {
  try {
    const { id } = await getUserByToken(token);
    const item = {
      roomId: uuidV4(),
      ...room,
      members: [id],
    };

    const params = {
      TableName: 'icc4220-room-table',
      Item: item,
    };
    await dynamo.createItem(params);
    return item;
  } catch (error) {
    console.log(error.message);
  }
};
