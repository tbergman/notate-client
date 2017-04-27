// @flow

import { List } from 'immutable'
import type { Task } from 'Types'
import tasksReducer from '../reducers'
import { ADD_TASK, DELETE_TASK } from '../actionTypes'
import type { AddTaskAction, DeleteTaskAction } from '../actions'

describe('modules/tasks', () => {
  let myDummyTask: Task = {
    id: '123'
  }

  describe('ADD_TASK', () => {
    let emptyState
    let action: AddTaskAction = { type: ADD_TASK, payload: myDummyTask }

    beforeEach(() => {
      emptyState = {
        list: new List(),
      }
    })

    it('should add a task to the stack', () => {
      let currentState = emptyState
      let newState = tasksReducer(currentState, action)
      expect(newState.list).toEqual(List([myDummyTask]))
    })

    it('should treat current state as immutable', () => {
      let currentState = emptyState
      tasksReducer(currentState, action)
      expect(currentState).toEqual(emptyState)
    })
  })

  describe('DELETE_TASK', () => {
    let action: DeleteTaskAction = { type: DELETE_TASK, payload: myDummyTask }

    it('should remove a task from the stack', () => {
      let currentState = { list: new List([myDummyTask]) }
      let newState = tasksReducer(currentState, action)
      expect(newState.list).toEqual(new List())
    })

    it('should treat current state as immutable', () => {
      let currentState = { list: new List([myDummyTask]) }
      tasksReducer(currentState, action)
      expect(currentState).toEqual({ list: new List([myDummyTask]) })
    })
  })
})
