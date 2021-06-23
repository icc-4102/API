/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
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

export const listRooms = async (token): Promise<Object[]> => {
  const user = await getUserByToken(token);
  try {
    const params = {
      TableName: 'icc4220-room-table',
      Attributes: roomParams,
    };
    const result = (await dynamo.listItems(params)) as RoomParams[];
    const rooms = result.filter((room) => room.members.includes(user.id));

    // for (const room of rooms) {
    //   const names = await Promise.all(
    //     room.members.map(async (member) => getUserById(member)),
    //   );
    //   // eslint-disable-next-line no-param-reassign
    //   room.members = names;
    // }

    return rooms.map((room) => {
      const { roomId, roomName } = room;
      return { roomId, roomName };
    });
  } catch (error) {
    console.log(error);
  }
};
