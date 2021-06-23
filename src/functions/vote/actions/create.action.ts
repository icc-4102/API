/* eslint-disable consistent-return */
import { dynamo } from '@cloudcar-app/aws-tools-lib';
import { DynamoDB } from 'aws-sdk';
import { Deck } from '../../deck/deck';
import { getUserByToken } from '../../../../utils/get-user';
import { updateRoom } from '../utils/update-room';

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

export const voteRoom = async (token, body): Promise<Object> => {
  const user = await getUserByToken(token);
  const { vote, roomName } = body;
  const params: DynamoDB.DocumentClient.QueryInput = {
    TableName: 'icc4220-room-table',
    KeyConditionExpression: 'roomName = :roomName',
    ExpressionAttributeValues: {
      ':roomName': roomName,
    },
    ConsistentRead: true,
  };
  const room = (await dynamo.getItem(params)) as RoomParams;
  if (!room.deck.cards.includes(vote) && vote !== '☕️' && vote !== '?') {
    throw new Error('The card doesnt exist');
  }

  if (
    room &&
    room.members.includes(user.id) &&
    room.result &&
    room.result.filter((item) => item.name === user.name).length > 0
  ) {
    room.result.filter((item) => item.name === user.name)[0].vote = vote;
    await updateRoom(room);
    return room;
  }
  if (room && room.members.includes(user.id)) {
    const voted = { name: user.name, vote } as Vote;
    if (room.result !== undefined) {
      room.result.push(voted);
    } else {
      room.result = [voted];
    }
    await updateRoom(room);
    return room;
  }
  return null;
};
