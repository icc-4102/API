import { dynamo } from '@cloudcar-app/aws-tools-lib';
import { DynamoDB, Location } from 'aws-sdk';
import { Deck } from '../../deck/deck';
import { getUserByToken, getUserById } from '../../../../utils/get-user';

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

export const getRoom = async (token, roomName): Promise<Object> => {
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
      const members = await Promise.all(
        room.members.map(async (member) => getUserById(member)),
      );
      if (!room.locations) {
        room.members = members.map((member) => {
          return {
            username: member.name,
          };
        });
      } else {
        room.members = members.map((member) => {
          const location = room.locations.find(
            (item) => item.member === member.username,
          );
          if (location) {
            return {
              username: member.name,
              location: {
                long: location.long,
                lat: location.lat,
                timestamp: location.timestamp,
              },
            };
          }
          return {
            username: member.name,
          };
        });
      }

      const result = {
        roomId: room.roomId,
        roomName: room.roomName,
        deck: room.deck,
        members: room.members,
      };
      return result;
    }
    return null;
  } catch (error) {
    console.log(error.message);
  }
};
