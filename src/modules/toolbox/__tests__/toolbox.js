// @flow

import toolboxReducer from '../reducers'
import { SET_ACCIDENTAL, SET_DURATION } from '../actionTypes'
import type { SetAccidentalAction, SetDurationAction } from '../actions'
import { ACCIDENTAL, DURATION } from '../constants'

describe('modules/toolbox', () => {

    let newAccidental = ACCIDENTAL.SHARP
    let newDuration = DURATION.EIGHTH

    describe('SET_ACCIDENTAL', () => {
        let initialState;
        beforeEach(() => {
            initialState = {
                selectedDuration: DURATION.QUARTER,
                selectedAccidental: ACCIDENTAL.NATURAL,
            }
        })
        let action: SetAccidentalAction = { type: SET_ACCIDENTAL, payload: newAccidental };
        it('should change the accidental to a different value', () => {
            let currentState = initialState;
            let newState = toolboxReducer(currentState, action);
            expect(newState.selectedAccidental).toEqual(newAccidental);
        });
        it('should treat current state as immutable', () => {
            let currentState = initialState;
            toolboxReducer(currentState, action);
            expect(currentState).toEqual(initialState);
        });
    });

    describe('SET_DURATION', () => {
        let initialState;
        beforeEach(() => {
            initialState = {
                selectedDuration: DURATION.QUARTER,
                selectedAccidental: ACCIDENTAL.NATURAL,
            }
        })
        let action: SetDurationAction = { type: SET_DURATION, payload: newDuration };
        it('should change the duration to a different value', () => {
            let currentState = initialState;
            let newState = toolboxReducer(currentState, action);
            expect(newState.selectedDuration).toEqual(newDuration);
        });
        it('should treat current state as immutable', () => {
            let currentState = initialState;
            toolboxReducer(currentState, action);
            expect(currentState).toEqual(initialState);
        });
    });

});
