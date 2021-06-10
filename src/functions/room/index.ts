import { handlerPath } from '../../libs/handlerResolver';

export const list = {
  handler: `${handlerPath(__dirname)}/controller/list.listRooms`,
  events: [
      { httpApi: {
        method: 'GET',
        path: '/rooms'
      }}
  ]
}
export const get = {
    handler: `${handlerPath(__dirname)}/controller/get.get`,
    events: [
        { httpApi: {
          method: 'GET',
          path: '/rooms/{roomId}'
        }}
    ]
  }
export const create = {
    handler: `${handlerPath(__dirname)}/controller/create.create`,
    events: [
        { httpApi: {
          method: 'POST',
          path: '/rooms'
        }}
    ]
  }
export const subscribe = {
    handler: `${handlerPath(__dirname)}/controller/subscribe.subscribe`,
    events: [
        { httpApi: {
          method: 'POST',
          path: '/rooms/join'
        }}
    ]
  }
export const unsubscribe = {
    handler: `${handlerPath(__dirname)}/controller/unsubscribe.unsubscribe`,
    events: [
        { httpApi: {
          method: 'POST',
          path: '/rooms/unsubscribe'
        }}
    ]
  }


