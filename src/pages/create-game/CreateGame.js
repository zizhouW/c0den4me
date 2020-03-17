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
    };
  }

  handleCreateRoom = () => {
    const { gameName } = this.state;
    firebase.firestore().collection('games').add({
      name: gameName,
      blues: [],
      reds: [],
      blueClueGiver: null,
      redClueGiver: null,
      currentClue: null,
      chats: [],
    }).then((res) => {
      firebase.firestore().collection('games').doc(res.id).onSnapshot((doc) => {
        if (doc.exists) {
          this.props.history.push(`/games/${doc.id}`);
        }
      });
    });
  }

  handleGameNameChange = (event) => {
    this.setState({
      gameName: event.target.value,
    });
  }

  render() {
    return (
      <div className="create-game-container">
        <h1>Create Game</h1>
        <FormControl>
          <InputLabel htmlFor="input-name">Queue Name</InputLabel>
          <Input id="input-name" value={this.state.gameName} onChange={this.handleGameNameChange} />
          <Button variant="contained" color="primary" onClick={this.handleCreateRoom}>
            Submit
          </Button>
        </FormControl>
      </div>
    )
  }
}

export default withRouter(CreateGame);
