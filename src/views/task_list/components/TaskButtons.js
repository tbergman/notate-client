import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import cuid from 'cuid'
import { addTask, asyncAddTask } from '../../../modules/tasks/actions'

const mapDispatchToProps = ( dispatch ) => {
  return {
    addTask: (task) => {
      //in this dumb example, we don't even have a task. so...
      task = {
        id: cuid()
      };

      dispatch(addTask(task))
    },
    asyncAddTask: (task) => {
      task = {
        id: cuid()
      };
      dispatch(asyncAddTask(task))
    }
  }
};

class TaskButtons extends Component {

  static propTypes = {
    addTask: PropTypes.func.isRequired,
    asyncAddTask: PropTypes.func.isRequired
  };

  render() {
    const { addTask, asyncAddTask } = this.props;

    return (
      <div>
        <button onClick={addTask}>Add a task</button>
        <button onClick={asyncAddTask}>Async a task</button>
      </div>
    )
  }

}

export default connect(null, mapDispatchToProps)(TaskButtons);
