import { handlerPath } from '../../libs/handlerResolver';

export default {
  handler: `${handlerPath(__dirname)}/signup.signup`,
  events: [
    {
      httpApi: {
        method: 'POST',
        path: '/signup'
      }
    }
  ]
}