import { handlerPath } from '../../libs/handlerResolver';

export const list = {
  handler: `${handlerPath(__dirname)}/list.listRooms`,
  events: [
      { httpApi: {
        method: 'GET',
        path: '/rooms'
      }}
  ]
}
export const get = {
    handler: `${handlerPath(__dirname)}/get.get`,
    events: [
        { httpApi: {
          method: 'Get',
          path: '/rooms/{roomId}'
        }}
    ]
  }


