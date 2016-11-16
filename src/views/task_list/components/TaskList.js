import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteTask } from '../../../modules/tasks/actions'

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks
  }
};

const mapDispatchToProps = ( dispatch ) => {
  return {
    onDelete: ( task ) => {
      return dispatch(deleteTask(task));
    }
  }
};

export class TaskList extends Component {

  render() {

    const { tasks, onDelete } = this.props;



    return (
      <div>
        {tasks.map(task =>
          <div key={task.id} className='task'>Task ID: {task.id} [<a onClick={() => onDelete(task)}>DELETE</a>]</div>
        )}
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
