import { dynamo } from '@cloudcar-app/aws-tools-lib';
import { DynamoDB } from 'aws-sdk';
import { Deck } from '../../deck/deck';
import { getUserByToken } from '../../../../utils/get-user';

interface RoomParams {
  roomId: string;
  roomName: string;
  deck: Deck;
  members: string[];
  result: Vote[];
}

interface Vote {
  name: string;
  vote: string;
}

export const getVoteResults = async (token, roomName): Promise<Object> => {
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
    const room = (await dynamo.getItem(params)) as RoomParams;
    if (room && room.members.includes(user.id)) {
      const { roomName, deck, result } = room;
      return { roomName, deck, result };
    }
    return null;
  } catch (error) {
    console.log(error.message);
  }
};
