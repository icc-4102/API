import {Deck} from '../deck/deck'
import {dynamo} from '@cloudcar-app/aws-tools-lib'


interface RoomParams {
    roomId: string
    roomName: string
    deck: Deck
    members: string[]
   }

let roomParams: RoomParams

export const listRooms = async (): Promise<RoomParams[]> => {
    try {
        const params = {
            TableName: "icc4220-room-table",
            Attributes: roomParams,
          };
          const result = await dynamo.listItems(params) as RoomParams[];
          return result
    } catch (error) {
        console.log(error.message)
    }
}