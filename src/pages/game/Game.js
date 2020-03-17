import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@material-ui/core';
import { getGameData, joinGame, leaveGame, startGame } from '../../redux/actions/Game';
import getWordsByIndices from '../../utils/getWordsByIndices';
import { getBoard, getBoardById } from '../../utils/getBoard';
import Grid from '../../utils/grid';
import './Game.scss';

const BOARD_ARRAY = [0, 1, 2, 3, 4];
const Game = (props) => {
  const { gameData, currentUser, onJoinGame, onLeaveGame, onStartGame } = props;
  const [playerName, setPlayerName] = React.useState(null);
  const [playerNameError, setPlayerNameError] = React.useState(null);
  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
    setPlayerNameError('');
  };
  const handleSubmitPlayerName = () => {
    if (playerName && playerName.length && gameData &&
      !gameData.blues.includes(playerName) &&
      !gameData.reds.includes(playerName)) {
        onJoinGame(playerName.trim(), gameData.blues.length <= gameData.reds.length);
      } else if (!(playerName && playerName.length)) {
        setPlayerNameError('Please enter a valid name.');
      } else if (gameData.blues.includes(playerName) ||
      gameData.reds.includes(playerName)) {
        setPlayerNameError('The name you entered already exists');
      }
  };
  const handleStartGame = () => {
    const blueClueGiver = gameData.blues[Math.floor(Math.random() * gameData.blues.length)];
    const redClueGiver = gameData.reds[Math.floor(Math.random() * gameData.reds.length)];
    const boardId = getBoard().id;
    onStartGame(getWordsByIndices(
      Array.from(new Array(25), idx => idx = Math.ceil(Math.random() * 5000))),
      blueClueGiver, redClueGiver, boardId);
  };
  const handleWordClick = (event, answerKey) => {
    console.log(event);
    console.log(answerKey);
  };
  const handleLeaveGame = () => {
    onLeaveGame(currentUser, gameData.blues.includes(currentUser));
  };
  let wordBoard = null;
  if (gameData && gameData.started && gameData.wordList && gameData.wordList.length && gameData.boardId) {
    const currentBoard = getBoardById(gameData.boardId);
    console.log(currentBoard)
    wordBoard = (
      <div className="word-board">
        {BOARD_ARRAY.map(row => (
          <div className="word-board__row">
            {BOARD_ARRAY.map(col => (
              <Button
                variant="outlined"
                className="word-board__row__choice"
                color="default"
                disabled={gameData.currentClue}
                onClick={(e) => handleWordClick(e, currentBoard.keys[row][col])}
              >
                {gameData.wordList[row * BOARD_ARRAY.length + col]}
              </Button>
            ))}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="game-container">
      {gameData && gameData.name && (
        <div>
          <h1>Room name: {gameData.name}</h1>
          <ul>
            <span>Blue Team:</span>
            {gameData.blues.map((blue) => (
              <li className={currentUser === blue ? 'is-current-user' : ''}>
                {blue}{blue === gameData.blueClueGiver ? ' (Clue Giver)' : ''}
              </li>
            ))}
          </ul>
          <ul>
            <span>Red Team:</span>
            {gameData.reds.map((red) => (
              <li className={currentUser === red ? 'is-current-user' : ''}>
                {red}{red === gameData.redClueGiver ? ' (Clue Giver)' : ''}
              </li>
            ))}
          </ul>
          {!gameData.started && (
            <Button
              onClick={handleStartGame}
              variant="contained"
              color="primary"
              disabled={gameData.blues.length < 2 || gameData.reds.length < 2}
            >
              Start Game
            </Button>
          )}
          {gameData.blues.length < 2 || gameData.reds.length < 2 ? (
            <div className="min-player-msg">* Game requires minimum 2 players on each team.</div>
          ) : null}
          {wordBoard}
          {gameData.boardId && (
            <img src={`answers/${gameData.boardId}.png`} />
          )}
        </div>
      )}
      {currentUser && (
        <Button onClick={handleLeaveGame} variant="contained" color="primary">
          Exit Game
        </Button>
      )}
      <Dialog className="player-name-dialog" open={currentUser} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enter your name</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your name will be used in game.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="name"
            fullWidth
            onChange={handlePlayerNameChange}
          />
          {playerNameError && <span className="player-name-dialog-error">{playerNameError}</span>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitPlayerName} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    gameData: state.getGameReducer.gameData,
    currentUser: state.joinGameReducer.joinGameResponse.currentUser,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getGameData: dispatch(getGameData(ownProps.match.params.gameId)),
    onJoinGame: ((name, isJoiningBlueTeam) => {
      dispatch(joinGame(ownProps.match.params.gameId, name, isJoiningBlueTeam));
    }),
    onLeaveGame: ((name, isOnBlueTeam) => {
      dispatch(leaveGame(ownProps.match.params.gameId, name, isOnBlueTeam));
    }),
    onStartGame: ((wordList, blueClueGiver, redClueGiver, boardId) => {
      dispatch(startGame(ownProps.match.params.gameId, wordList, blueClueGiver, redClueGiver, boardId));
    }),
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
