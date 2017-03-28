// @flow

import type { AppState } from 'modules/reducers'
import type { Task } from 'Types'
import type { List } from 'immutable'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteTask } from 'modules/tasks/actions'
import { selectTaskList } from 'modules/tasks/selectors'

type StateProps = {
  tasks: List<Task>,
}

type DispatchProps = {
  deleteTask: Function,
}

type Props = StateProps & DispatchProps

export class TaskList extends Component {

  props: Props

  onDelete = ( task: Task ) => this.props.deleteTask(task)

  render(): React.Element<any> {

    const { tasks } = this.props;
    console.info('tasks', tasks)

    return (
      <div>
        {tasks.map(task =>
          <div key={task.id} className='task'>Task ID: {task.id} [<a onClick={() => this.onDelete(task)}>DELETE</a>]</div>
        )}
      </div>
    )
  }

}

const mapStateToProps = (state: AppState) => ({
  tasks: selectTaskList(state)
});

export default connect(mapStateToProps, { deleteTask })(TaskList);
