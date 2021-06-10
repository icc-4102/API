import {Deck} from '../../deck/deck'
import { dynamo } from '@cloudcar-app/aws-tools-lib'
import { getUserByToken } from '../../../../utils/get-user'
interface RoomParams {
    roomId: string
    roomName: string
    deck: Deck
    members: string[]
   }

export const getRoom = async (token, roomId): Promise<RoomParams> => {
    const user = await getUserByToken(token)
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
        if (!result && result.members.includes(user.id)) {
            return result
        }
        return null
    } catch (error) {
        console.log(error.message)
    }
}