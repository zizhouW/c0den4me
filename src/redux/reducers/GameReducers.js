import * as types from '../types/Game';

const getGameState = {
  gameData: {},
  isGameDataLoading: false,
  gameDataError: null,
}

const joinGameState = {
  joinGameResponse: {},
  isJoinGameLoading: false,
  joinGameError: null,
};

const leaveGameState = {
  leaveGameResponse: {},
  isLeaveGameLoading: false,
  leaveGameError: null,
};

const startGameState = {
  startGameResponse: {},
  isStartGameLoading: false,
  startGameError: null,
};

export const getGameReducer = (state = getGameState, action) => {
  switch(action.type) {
    case types.QUEUE_DATA_LOADING:
      return { ...state, isGameDataLoading: action.payload, gameDataError: null };
    case types.QUEUE_DATA_SUCCESS:
      return { ...state, isGameDataLoading: false, gameData: action.payload };
    case types.QUEUE_DATA_ERROR:
      return { ...state, isGameDataLoading: false, gameDataError: action.payload };
    default:
      return state;
  }
}

export const joinGameReducer = (state = joinGameState, action) => {
  switch(action.type) {
    case types.JOIN_QUEUE_LOADING:
      return { ...state, isJoinGameLoading: action.payload, joinGameError: null };
    case types.JOIN_QUEUE_SUCCESS:
      return { ...state, isJoinGameLoading: false, joinGameResponse: action.payload };
    case types.JOIN_QUEUE_ERROR:
      return { ...state, isJoinGameLoading: false, joinGameError: action.payload };
    default:
      return state;
  }
}


export const leaveGameReducer = (state = leaveGameState, action) => {
  switch(action.type) {
    case types.LEAVE_QUEUE_LOADING:
      return { ...state, isLeaveGameLoading: action.payload, leaveGameError: null };
    case types.LEAVE_QUEUE_SUCCESS:
      return { ...state, isLeaveGameLoading: false, leaveGameResponse: action.payload };
    case types.LEAVE_QUEUE_ERROR:
      return { ...state, isLeaveGameLoading: false, leaveGameError: action.payload };
    default:
      return state;
  }
}


export const startGameReducer = (state = startGameState, action) => {
  switch(action.type) {
    case types.START_QUEUE_LOADING:
      return { ...state, isStartGameLoading: action.payload, startGameError: null };
    case types.START_QUEUE_SUCCESS:
      return { ...state, isStartGameLoading: false, startGameResponse: action.payload };
    case types.START_QUEUE_ERROR:
      return { ...state, isStartGameLoading: false, startGameError: action.payload };
    default:
      return state;
  }
}
