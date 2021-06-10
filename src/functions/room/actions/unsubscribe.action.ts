import { dynamo } from '@cloudcar-app/aws-tools-lib'
import { getUserByToken } from '../../../../utils/get-user'
import {Deck} from '../../deck/deck'

interface RoomParams {
    roomId: string
    roomName: string
    deck: Deck
    members: string[]
   }
export const unsubscribeRoom = async (token,roomId) => {
  try {

    const { id } = await getUserByToken(token)
   

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