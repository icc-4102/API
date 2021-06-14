import { handlerPath } from '../../libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/login.login`,
  events: [
    {
      httpApi: {
        method: 'POST',
        path: '/login',
      },
    },
  ],
};
