import { combineReducers } from 'redux';

import login from './login';
import { status } from './status';
import screen from './screen';
import channels from './channels';
import game from './game';

const rootReducer = combineReducers({ login, status, screen, channels, game });

export default rootReducer;