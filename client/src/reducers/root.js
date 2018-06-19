import { combineReducers } from 'redux';

import login from './login';
import status from './status';
import screen from './screen';

const rootReducer = combineReducers({ login, status, screen });

export default rootReducer;