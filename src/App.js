import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Stack } from '@mui/material';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default class App extends Component {
  render() {
    return (
      <Stack className="App" minWidth={ 300 } maxWidth={ 1200 }>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ Game } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/ranking" component={ Ranking } />
        </Switch>
      </Stack>
    );
  }
}
