import deck from './deck';
import login from './login';
import signup from './signup';
import {
  get as getRoom,
  list as listRooms,
  create as createRoom,
  subscribe as subscribeRoom,
  unsubscribe as unsubscribeRoom,
} from './room';
import { getResult, vote } from './vote';
import { reportLocation } from './location';

export default {
  deck,
  login,
  signup,
  getRoom,
  listRooms,
  createRoom,
  subscribeRoom,
  unsubscribeRoom,
  getResult,
  vote,
  reportLocation,
};
