import { dynamo } from '@cloudcar-app/aws-tools-lib';
import { DynamoDB } from 'aws-sdk';
import { getUserByToken } from '../../../../utils/get-user';
import { Deck } from '../../deck/deck';
import { updateRoom } from '../utils/update-room';

interface RoomParams {
  roomId: string;
  roomName: string;
  deck: Deck;
  members: string[];
}
export const unsubscribeRoom = async (token, body) => {
  try {
    const { id } = await getUserByToken(token);
    const { roomName } = body;

    const params: DynamoDB.DocumentClient.QueryInput = {
      TableName: 'icc4220-room-table',
      KeyConditionExpression: 'roomName = :roomName',
      ExpressionAttributeValues: {
        ':roomName': roomName,
      },
      ConsistentRead: true,
    };

    const room = (await dynamo.getItem(params)) as RoomParams;
    if (room && room.members.includes(id)) {
      const index = room.members.indexOf(id);
      if (index > -1) {
        room.members.splice(index, 1);
      }
      await updateRoom(room);
    }
    return { message: "Desuscribir sala fue ejecutado correctamente" };
  } catch (error) {
    console.log(error.message);
  }
};
