import { getUserByToken } from './get-user';

export const checkToken = async (token) => {
  const user = await getUserByToken(token);
  if (user) {
    return true;
  }

  throw new Error('The token not valid');
};
