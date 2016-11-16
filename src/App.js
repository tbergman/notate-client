import React, { Component } from 'react';
import TaskButtons from './views/task_list/components/TaskButtons'
import TaskList from './views/task_list/components/TaskList'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <TaskButtons />
        <TaskList />
      </div>
    );
  }
}

export default App;
