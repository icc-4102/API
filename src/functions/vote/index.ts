import { handlerPath } from '../../libs/handlerResolver';

export const getResult = {
  handler: `${handlerPath(__dirname)}/controllers/get.getVote`,
  events: [
    {
      httpApi: {
        method: 'GET',
        path: '/getResult/{roomName}',
      },
    },
  ],
};
export const vote = {
  handler: `${handlerPath(__dirname)}/controllers/create.createVote`,
  events: [
    {
      httpApi: {
        method: 'POST',
        path: '/vote',
      },
    },
  ],
};
