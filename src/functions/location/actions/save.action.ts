import { dynamo } from '@cloudcar-app/aws-tools-lib';
import { v4 as uuidV4 } from 'uuid';
import { DynamoDB } from 'aws-sdk';
import { getUserByToken } from '../../../../utils/get-user';
import { Deck } from '../../deck/deck';
import { updateRoom } from '../utils/update-room';

interface RoomParams {
  roomId: string;
  roomName: string;
  deck: Deck;
  members: Members[];
  locations: Location[];
}

interface Members {
  name: string;
  location: Location;
}

interface Location {
  member: string;
  lat: string;
  long: string;
  timestamp: string;
}

interface UserParams {
  id: string;
  username: string;
  name: string;
}

export const saveLocation = async (body, token) => {
  try {
    const user = (await getUserByToken(token)) as UserParams;
    const { lat, long, roomName } = body;
    const params: DynamoDB.DocumentClient.QueryInput = {
      TableName: 'icc4220-room-table',
      KeyConditionExpression: 'roomName = :roomName',
      ExpressionAttributeValues: {
        ':roomName': roomName,
      },
      ConsistentRead: true,
    };
    const room = (await dynamo.getItem(params)) as RoomParams;
    if (room.members.find((item) => item === user.id)) {
      const location = {
        member: user.username,
        lat,
        long,
        timestamp: Date(),
      };
      if (
        room.locations &&
        !room.locations.find((item) => item.member === user.username)
      ) {
        room.locations.push(location);
      }
      if (
        room.locations &&
        room.locations.find((item) => item.member === user.username)
      ) {
        const index = room.locations.findIndex(
          (item) => item.member === user.username,
        );
        room.locations[index] = location;
      } else {
        room.locations = [];
        room.locations.push(location);
      }
      await updateRoom(room);
      return room;
    }
    return null;
  } catch (err) {
    console.log(err.message);
  }
};
