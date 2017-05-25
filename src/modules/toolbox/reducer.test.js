// @flow

import type {
  SetAccidentalAction,
  SetDurationAction,
  ToggleRestAction,
  ToggleDotAction }
from 'modules/toolbox/actions'

import reducer from 'modules/toolbox/reducer'
import { ACCIDENTAL, DURATION } from 'modules/toolbox'
import {
  SET_DURATION,
  SET_ACCIDENTAL,
  TOGGLE_REST,
  TOGGLE_DOT,
  TOGGLE_SELECTION_TOOL,
} from 'modules/toolbox/actions'

describe('toolbox reducer', () => {
  const initialState = {
    selectedDuration: DURATION.QUARTER,
    selectedAccidental: ACCIDENTAL.NATURAL,
    restSelected: false,
    dotSelected: false,
    selectionTool: false,
  }

  it('sets an accidental', () => {
    const action: SetAccidentalAction = { type: SET_ACCIDENTAL, payload: ACCIDENTAL.SHARP }

    const result = reducer(initialState, action)

    expect(result.selectedAccidental).toEqual(ACCIDENTAL.SHARP)
  })

  it('clear the accidental when selected value was same as before', () => {
    const action: SetAccidentalAction = { type: SET_ACCIDENTAL, payload: ACCIDENTAL.NATURAL }

    const result = reducer(initialState, action)

    expect(result.selectedAccidental).toEqual(ACCIDENTAL.NONE)
  })

  it('sets a duration', () => {
    const action: SetDurationAction = { type: SET_DURATION, payload: DURATION.EIGHTH }

    const result = reducer(initialState, action)

    expect(result.selectedDuration).toEqual(DURATION.EIGHTH)
  })

  it('setting a duration should clear the selection tool', () => {
    const action: SetDurationAction = { type: SET_DURATION, payload: DURATION.EIGHTH }

    const state = {
      ...initialState,
      selectionTool: true,
    }

    const result = reducer(state, action)

    expect(result.selectionTool).toEqual(false)
  })

  it('toggles a rest', () => {
    const action: ToggleRestAction = { type: TOGGLE_REST }

    const result = reducer(initialState, action)

    expect(result.restSelected).toEqual(true)

    const nextToggle = reducer(result, action)

    expect(nextToggle.restSelected).toEqual(false)
  })

  it('toggles a dot', () => {
    const action: ToggleDotAction = { type: TOGGLE_DOT }

    const result = reducer(initialState, action)

    expect(result.dotSelected).toEqual(true)

    const nextToggle = reducer(result, action)

    expect(nextToggle.dotSelected).toEqual(false)
  })

  it('toggles the selection tool', () => {
    const action: ToggleSelectionToolAction = { type: TOGGLE_SELECTION_TOOL }

    const result = reducer(initialState, action)

    expect(result.selectionTool).toEqual(true)

    const nextToggle = reducer(result, action)

    expect(nextToggle.selectionTool).toEqual(false)
  })
})
