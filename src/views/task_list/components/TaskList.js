// @flow

import type { AppState, Task, TasksState } from 'Types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteTask } from 'modules/tasks/actions'
import { tasksSelector } from 'modules/tasks'

const mapStateToProps = (state: AppState) => {
  return {
    tasks: tasksSelector(state)
  }
};

type Props = {
  deleteTask: Function,
  tasks: TasksState,
}

export class TaskList extends Component {

  props: Props

  onDelete = ( task: Task ) => this.props.deleteTask(task)

  render(): React.Element<any> {

    const { tasks } = this.props;

    return (
      <div>
        {tasks.map(task =>
          <div key={task.id} className='task'>Task ID: {task.id} [<a onClick={() => this.onDelete(task)}>DELETE</a>]</div>
        )}
      </div>
    )
  }

}

export default connect(mapStateToProps, { deleteTask })(TaskList);
