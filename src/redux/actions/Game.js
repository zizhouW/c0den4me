import * as types from '../types/Game';
import firebase from '../../utils/firebase';
import { startGameReducer } from '../reducers/GameReducers';

const getQueueDataLoading = (payload) => {
  return {
    type: types.QUEUE_DATA_LOADING,
    payload
  }
};

const getQueueDataSuccess = (payload) => {
  return {
    type: types.QUEUE_DATA_SUCCESS,
    payload
  }
};

const getQueueDataError = (payload) => {
  return {
    type: types.QUEUE_DATA_ERROR,
    payload
  }
};

const joinQueueLoading = (payload) => {
  return {
    type: types.JOIN_QUEUE_LOADING,
    payload
  }
};

const joinQueueSuccess = (payload) => {
  return {
    type: types.JOIN_QUEUE_SUCCESS,
    payload
  }
};

const joinQueueError = (payload) => {
  return {
    type: types.JOIN_QUEUE_ERROR,
    payload
  }
};

const leaveQueueLoading = (payload) => {
  return {
    type: types.LEAVE_QUEUE_LOADING,
    payload
  }
};

const leaveQueueSuccess = (payload) => {
  return {
    type: types.LEAVE_QUEUE_SUCCESS,
    payload
  }
};

const leaveQueueError = (payload) => {
  return {
    type: types.LEAVE_QUEUE_ERROR,
    payload
  }
};

const startGameLoading = (payload) => {
  return {
    type: types.START_QUEUE_LOADING,
    payload
  }
};

const startGameSuccess = (payload) => {
  return {
    type: types.START_QUEUE_SUCCESS,
    payload
  }
};

const startGameError = (payload) => {
  return {
    type: types.START_QUEUE_ERROR,
    payload
  }
};

const getGameData = (gameId) => (dispatch) => {
  if (!gameId) return;
  let isLoading = true;
  dispatch(getQueueDataLoading(isLoading));
  firebase.firestore().collection('games').doc(gameId).onSnapshot((doc) => {
    if (doc.exists) {
      isLoading = false;
      dispatch(getQueueDataLoading(isLoading));
      dispatch(getQueueDataSuccess(doc.data()));
    }
  }, error => {
    isLoading = false;
    dispatch(getQueueDataLoading(isLoading));
    dispatch(getQueueDataError(error));
  });
};

const joinGame = (gameId, userName, isJoiningBlueTeam) => (dispatch) => {
  if (!(userName && gameId)) return;

  let isLoading = true;
  dispatch(joinQueueLoading(isLoading));
  const updatingTeam = isJoiningBlueTeam ? {
    blues: firebase.firestore.FieldValue.arrayUnion(userName),
  } : {
    reds: firebase.firestore.FieldValue.arrayUnion(userName),
  };
  firebase.firestore().collection('games').doc(gameId).update(updatingTeam).then(response => {
    isLoading = false;
    dispatch(joinQueueLoading(isLoading));
    if (!response) {
      dispatch(joinQueueSuccess({ currentUser: userName }));
    } else {
      dispatch(joinQueueError('Something went wrong.'));
    }
  });
};

const leaveGame = (gameId, userName, isOnBlueTeam) => (dispatch) => {
  if (!(userName && typeof(userName) === 'string' && gameId)) return;

  let isLoading = true;
  dispatch(leaveQueueLoading(isLoading));
  const updatingTeam = isOnBlueTeam ? {
    blues: firebase.firestore.FieldValue.arrayRemove(userName),
  } : {
    reds: firebase.firestore.FieldValue.arrayRemove(userName),
  };
  firebase.firestore().collection('games').doc(gameId).update(updatingTeam).then(response => {
    isLoading = false;
    dispatch(leaveQueueLoading(isLoading));
    if (!response) {
      dispatch(joinQueueSuccess({ currentUser: null }));
      dispatch(leaveQueueSuccess({ message: 'Left successfully.'}));
    } else {
      dispatch(leaveQueueError('Something went wrong.'));
    }
  });
};

const startGame = (gameId, wordList, blueClueGiver, redClueGiver, boardId) => (dispatch) => {
  if (!gameId) return;

  let isLoading = true;
  dispatch(startGameLoading(isLoading));
  firebase.firestore().collection('games').doc(gameId).update({
    started: true,
    wordList,
    blueClueGiver,
    redClueGiver,
    boardId,
  }).then(response => {
    isLoading = false;
    dispatch(startGameLoading(isLoading));
    if (!response) {
      dispatch(startGameSuccess());
    } else {
      dispatch(startGameError('Something went wrong.'));
    }
  });
};

export { getGameData, joinGame, leaveGame, startGame };
