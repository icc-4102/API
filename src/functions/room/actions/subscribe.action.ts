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
  password: string;
}
export const subscribeRoom = async (token, body) => {
  try {
    const { id } = await getUserByToken(token);
    const { name, password } = body;

    const params: DynamoDB.DocumentClient.QueryInput = {
      TableName: 'icc4220-room-table',
      KeyConditionExpression: 'roomName = :roomName',
      ExpressionAttributeValues: {
        ':roomName': name,
      },
      ConsistentRead: true,
    };

    const room = (await dynamo.getItem(params)) as RoomParams;
    if (room && !room.members.includes(id) && password === room.password) {
      room.members.push(id);
      await updateRoom(room);
      return room;
    }
    return {};
  } catch (error) {
    console.log(error.message);
  }
};
