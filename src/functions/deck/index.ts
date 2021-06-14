import { handlerPath } from '../../libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/deck.getDeck`,
  events: [
    {
      httpApi: {
        method: 'GET',
        path: '/decks',
      },
    },
  ],
};
