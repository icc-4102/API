import { dynamo } from '@cloudcar-app/aws-tools-lib';
import { DynamoDB } from 'aws-sdk';
import { Deck } from '../../deck/deck';
import { getUserByToken } from '../../../../utils/get-user';

interface RoomParams {
  roomId: string;
  roomName: string;
  deck: Deck;
  members: string[];
}

export const getRoom = async (token, roomName): Promise<RoomParams> => {
  const user = await getUserByToken(token);
  try {
    const params: DynamoDB.DocumentClient.QueryInput = {
      TableName: 'icc4220-room-table',
      KeyConditionExpression: 'roomName = :roomName',
      ExpressionAttributeValues: {
        ':roomName': roomName,
      },
      ConsistentRead: true,
    };
    const result = (await dynamo.getItem(params)) as RoomParams;
    if (result && result.members.includes(user.id)) {
      return result;
    }
    return null;
  } catch (error) {
    console.log(error.message);
  }
};
