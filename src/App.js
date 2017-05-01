// @flow

import React, { Component } from 'react';
import Stave from 'views/music/components/Stave'
import Note from 'views/music/components/Note'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  render(): React.Element<any> {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <Stave clef={"treble"}>
        </Stave>
      </div>
    );
  }
}

export default App
