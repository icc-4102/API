import { dynamo } from '@cloudcar-app/aws-tools-lib'
import { getUserByToken } from '../../../../utils/get-user'
import {Deck} from '../../deck/deck'

interface RoomParams {
    roomId: string
    roomName: string
    deck: Deck
    members: string[]
   }
export const subscribeRoom = async (token,body) => {
  try {

    const { id } = await getUserByToken(token)
    const { roomName } = body
   

    const params = {
      TableName: "icc4220-user-table",
      KeyConditionExpression: 'roomName = :roomName',
      ExpressionAttributeValues: {
        ':roomName': roomName,
      },
      ConsistentRead: true,
    };
    const result = await dynamo.getItem(params) as RoomParams;
    return result
  } catch (error) {
      console.log(error.message)
  }
}