import { dynamo } from '@cloudcar-app/aws-tools-lib';
import { Deck } from '../../deck/deck';
import { getUserByToken, getUserById } from '../../../../utils/get-user';

interface RoomParams {
  roomId: string;
  roomName: string;
  deck: Deck;
  members: string[];
}

let roomParams: RoomParams;

export const listRooms = async (token): Promise<RoomParams[]> => {
  const user = await getUserByToken(token);
  try {
    const params = {
      TableName: 'icc4220-room-table',
      Attributes: roomParams,
    };
    const result = (await dynamo.listItems(params)) as RoomParams[];
    const members = await Promise.resolve(result.map(async (room) => await room.members.map(async (member) => await getUserById(member)))).then((mem) => console.log(mem))
    console.log(members)
    return result.filter((room) => room.members.includes(user.id));
  } catch (error) {
    console.log(error.message);
  }
};
