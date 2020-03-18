import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core';
import firebase from '../../utils/firebase';
import './CreateGame.scss';

class CreateGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameName: '',
      error: '',
    };
  }

  handleCreateRoom = () => {
    const { gameName } = this.state;
    if (!gameName) {
      this.setState({
        error: 'Please enter a valid game room name.',
      });
      return;
    }
    firebase.firestore().collection('games').add({
      name: gameName,
      blues: [],
      reds: [],
      blueClueGiver: null,
      redClueGiver: null,
      currentClue: null,
      chats: [],
      started: false,
      wordList: [],
      boardId: null,
    }).then((res) => {
      firebase.firestore().collection('games').doc(res.id).onSnapshot((doc) => {
        debugger
        if (doc.exists) {
          this.props.history.push(`/games/${doc.id}`);
        }
      });
    });
  }

  handleGameNameChange = (event) => {
    const { error } = this.state;
    this.setState({
      gameName: event.target.value,
    });
    if (error) {
      this.setState({
        error: '',
      });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <div className="create-game-container">
        <h1>Create Game</h1>
        <FormControl>
          <InputLabel htmlFor="input-name">Game Name</InputLabel>
          <Input id="input-name" value={this.state.gameName} onChange={this.handleGameNameChange} />
          <Button variant="contained" color="primary" onClick={this.handleCreateRoom}>
            Submit
          </Button>
        </FormControl>
        {error && error.length && (
          <div class="create-game-error">{error}</div>
        )}
      </div>
    )
  }
}

export default withRouter(CreateGame);
