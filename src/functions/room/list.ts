import {Deck} from '../deck/deck'
import {dynamo} from '@cloudcar-app/aws-tools-lib'


interface RoomParams {
    roomId: string
    roomName: string
    deck: Deck
    members: string[]
   }

export const listRooms = async (roomId): Promise<RoomParams[]> => {
    try {
        const params = {
            TableName: "icc4220-room-table",
            Attributes: {roomId},
          };
          const result = await dynamo.listItems(params) as RoomParams[];
          return result
    } catch (error) {
        console.log(error.message)
    }
}