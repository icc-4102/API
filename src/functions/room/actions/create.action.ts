
import { dynamo } from '@cloudcar-app/aws-tools-lib'
import { getUserByToken } from '../../../../utils/get-user'

export const createRooms = async (room,token) => {
  try {

    const { id } = await getUserByToken(token)
    const item = {
      ...room,
      id
    }

    const params = {
        TableName: "icc4220-room-table",
        Item: item,
    };
    console.log(params)
      const result = await dynamo.createItem(params);
      return result
  } catch (error) {
      console.log(error.message)
  }
}