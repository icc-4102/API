import { DynamoDB } from 'aws-sdk';
import { Deck } from '../../deck/deck';

const dynamo = process.env.LOCAL
  ? new DynamoDB({ region: 'localhost', endpoint: 'http://localhost:8000' })
  : new DynamoDB({ region: process.env.REGION || 'us-east-1' });

const documentClient = new DynamoDB.DocumentClient({ service: dynamo });

interface RoomParams {
  roomId: string;
  roomName: string;
  deck: Deck;
  members: string[];
}

export const updateRoom = async (room: RoomParams) => {
  const params: DynamoDB.DocumentClient.UpdateItemInput = {
    TableName: 'icc4220-room-table',
    Key: {
      roomName: room.roomName,
    },
    UpdateExpression: 'set #new_members = :x',
    ExpressionAttributeNames: {
      '#new_members': 'members',
    },
    ExpressionAttributeValues: {
      ':x': room.members,
    },
  };
  try {
    const result = await documentClient.update(params).promise();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};
