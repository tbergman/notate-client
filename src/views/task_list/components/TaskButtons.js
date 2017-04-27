// @flow
import type { Task } from 'Types'

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import cuid from 'cuid'
import { addTask } from 'modules/tasks/actions'

class TaskButtons extends Component {

  static propTypes = {
    addTask: PropTypes.func.isRequired,
    // asyncAddTask: PropTypes.func.isRequired
  };

  addTask = (task: Task) => {
    //in this dumb example, we don't even have a task. so...
    task = {
      id: cuid()
    };

    this.props.addTask(task)
  }

  // asyncAddTask = (task: Task) => {
  //   //in this dumb example, we don't even have a task. so...
  //   task = {
  //     id: cuid()
  //   };
  //
  //   this.props.asyncAddTask(task)
  // }

  render(): React.Element<any> {
    return (
      <div>
        <button onClick={this.addTask.bind(this)}>Add a task</button>
        {/*<button onClick={this.asyncAddTask}>Async a task</button>*/}
      </div>
    )
  }

}

export default connect(null, { addTask })(TaskButtons);
