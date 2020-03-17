import { combineReducers } from 'redux';
import { getGameReducer, joinGameReducer, leaveGameReducer } from './GameReducers';
// import recommendationsReducer from '../features/recommendations/reducers';

const rootReducer = combineReducers({
  getGameReducer,
  joinGameReducer,
  leaveGameReducer,
});

export default rootReducer;
