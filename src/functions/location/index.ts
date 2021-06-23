import { handlerPath } from '../../libs/handlerResolver';

export const reportLocation = {
  handler: `${handlerPath(__dirname)}/controller/save.save`,
  events: [
    {
      httpApi: {
        method: 'POST',
        path: '/reportLocation',
      },
    },
  ],
};
