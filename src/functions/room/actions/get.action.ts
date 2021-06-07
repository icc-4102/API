import {Deck} from '../../deck'
import {dynamo} from '@cloudcar-app/aws-tools-lib'


interface RoomParams {
    roomId: string
    roomName: string
    deck: Deck
    members: string[]
   }

export const getRoom = async (roomId): Promise<RoomParams> => {
    try {
        const params = {
            TableName: "icc4220-user-table",
            KeyConditionExpression: 'roomId = :roomId',
            ExpressionAttributeValues: {
              ':roomId': roomId,
            },
            ConsistentRead: true,
          };
          const result = await dynamo.getItem(params) as RoomParams;
          return result
    } catch (error) {
        console.log(error.message)
    }
}