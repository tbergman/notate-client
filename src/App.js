// @flow

import React, { Component } from 'react';
import TaskButtons from 'views/task_list/components/TaskButtons'
import TaskList from 'views/task_list/components/TaskList'
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

        <Stave>
          <Note duration={4} pitch={'g/4'} />
          <Note duration={4} pitch={'f/4'} />
          <Note duration={4} pitch={'e/4'} />
        </Stave>
      </div>
    );
  }
}

export default App
