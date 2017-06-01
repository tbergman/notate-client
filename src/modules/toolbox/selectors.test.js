// @flow

import { selectToolboxItems } from './selectors'
import { initialState } from './reducer'
import { ACCIDENTAL, DURATION } from 'modules/toolbox'

describe('toolbox selectors', () => {
  let state, result

  beforeEach(() => {
    state = { toolbox: initialState }
  })

  describe('toolbox items', () => {
    describe('default state', () => {
      beforeEach(() => {
        result = selectToolboxItems(state)
      })

      it('should have all items enabled', () => {
        expect(result.cursor.enabled).toEqual(true)
        expect(result.eraser.enabled).toEqual(true)
        expect(result.rest.enabled).toEqual(true)
        expect(result.dot.enabled).toEqual(true)
        expect(result.durations.eighth.enabled).toEqual(true)
        expect(result.durations.quarter.enabled).toEqual(true)
        expect(result.durations.half.enabled).toEqual(true)
        expect(result.durations.whole.enabled).toEqual(true)
        expect(result.accidentals.natural.enabled).toEqual(true)
        expect(result.accidentals.sharp.enabled).toEqual(true)
        expect(result.accidentals.flat.enabled).toEqual(true)
        expect(result.accidentals.doubleSharp.enabled).toEqual(true)
        expect(result.accidentals.doubleFlat.enabled).toEqual(true)
      })

      it('should have duration quarter active', () => {
        expect(result.durations.eighth.active).toEqual(false)
        expect(result.durations.quarter.active).toEqual(true)
        expect(result.durations.half.active).toEqual(false)
        expect(result.durations.whole.active).toEqual(false)
      })

      it('should have all accidentals inactive', () => {
        expect(result.accidentals.natural.active).toEqual(false)
        expect(result.accidentals.sharp.active).toEqual(false)
        expect(result.accidentals.flat.active).toEqual(false)
        expect(result.accidentals.doubleSharp.active).toEqual(false)
        expect(result.accidentals.doubleFlat.active).toEqual(false)
      })

      it('should have cursor inative', () => {
        expect(result.cursor.active).toEqual(false)
      })

      it('should have eraser inative', () => {
        expect(result.eraser.active).toEqual(false)
      })

      it('should have dot inative', () => {
        expect(result.dot.active).toEqual(false)
      })

      it('should have rest inative', () => {
        expect(result.rest.active).toEqual(false)
      })
    })

    describe('when a duration is selected', () => {
      beforeEach(() => {
        state = {
          toolbox: { ...state.toolbox, selectedDuration: DURATION.WHOLE }
        }
        result = selectToolboxItems(state)
      })

      it('should have this duration active', () => {
        expect(result.durations.eighth.active).toEqual(false)
        expect(result.durations.quarter.active).toEqual(false)
        expect(result.durations.half.active).toEqual(false)
        expect(result.durations.whole.active).toEqual(true)
      })
    })

    describe('when an accidental is selected', () => {
      beforeEach(() => {
        state = {
          toolbox: { ...state.toolbox, selectedAccidental: ACCIDENTAL.SHARP }
        }
        result = selectToolboxItems(state)
      })

      it('should have this accidental active', () => {
        expect(result.accidentals.natural.active).toEqual(false)
        expect(result.accidentals.sharp.active).toEqual(true)
        expect(result.accidentals.flat.active).toEqual(false)
        expect(result.accidentals.doubleSharp.active).toEqual(false)
        expect(result.accidentals.doubleFlat.active).toEqual(false)
      })
    })

    describe('when the eraser is selected', () => {
      beforeEach(() => {
        state = {
          toolbox: {
            ...state.toolbox,
            eraserSelected: true,
            selectedAccidental: ACCIDENTAL.SHARP,
            selectedDuration: DURATION.WHOLE,
          }
        }
        result = selectToolboxItems(state)
      })

      it('should have the eraser active and enabled', () => {
        expect(result.eraser.enabled).toEqual(true)
        expect(result.eraser.active).toEqual(true)
      })

      it('should have all accidentals inative', () => {
        expect(result.accidentals.natural.active).toEqual(false)
        expect(result.accidentals.sharp.active).toEqual(false)
        expect(result.accidentals.flat.active).toEqual(false)
        expect(result.accidentals.doubleSharp.active).toEqual(false)
        expect(result.accidentals.doubleFlat.active).toEqual(false)
      })

      it('should have all accidentals disabled', () => {
        expect(result.accidentals.natural.enabled).toEqual(false)
        expect(result.accidentals.sharp.enabled).toEqual(false)
        expect(result.accidentals.flat.enabled).toEqual(false)
        expect(result.accidentals.doubleSharp.enabled).toEqual(false)
        expect(result.accidentals.doubleFlat.enabled).toEqual(false)
      })

      it('should have all durations inactive', () => {
        expect(result.durations.eighth.active).toEqual(false)
        expect(result.durations.quarter.active).toEqual(false)
        expect(result.durations.half.active).toEqual(false)
        expect(result.durations.whole.active).toEqual(false)
      })

      it('should have all durations disabled', () => {
        expect(result.durations.eighth.enabled).toEqual(false)
        expect(result.durations.quarter.enabled).toEqual(false)
        expect(result.durations.half.enabled).toEqual(false)
        expect(result.durations.whole.enabled).toEqual(false)
      })

      it('should have the cursor disabled', () => {
        expect(result.cursor.enabled).toEqual(false)
      })

      it('should have the cursor inactive', () => {
        expect(result.cursor.active).toEqual(false)
      })

      it('should have the dot disabled and inactive', () => {
        expect(result.dot.enabled).toEqual(false)
        expect(result.dot.active).toEqual(false)
      })

      it('should have the rest disabled and inactive', () => {
        expect(result.rest.enabled).toEqual(false)
        expect(result.rest.active).toEqual(false)
      })
    })

    describe('when rest is selected', () => {
      beforeEach(() => {
        state = {
          toolbox: {
            ...state.toolbox,
            restSelected: true,
            selectedAccidental: ACCIDENTAL.SHARP,
            selectedDuration: DURATION.WHOLE,
          }
        }
        result = selectToolboxItems(state)
      })

      it('should have all accidentals inative', () => {
        expect(result.accidentals.natural.active).toEqual(false)
        expect(result.accidentals.sharp.active).toEqual(false)
        expect(result.accidentals.flat.active).toEqual(false)
        expect(result.accidentals.doubleSharp.active).toEqual(false)
        expect(result.accidentals.doubleFlat.active).toEqual(false)
      })

      it('should have all accidentals disabled', () => {
        expect(result.accidentals.natural.enabled).toEqual(false)
        expect(result.accidentals.sharp.enabled).toEqual(false)
        expect(result.accidentals.flat.enabled).toEqual(false)
        expect(result.accidentals.doubleSharp.enabled).toEqual(false)
        expect(result.accidentals.doubleFlat.enabled).toEqual(false)
      })

      it('should have all durations enabled', () => {
        expect(result.durations.eighth.enabled).toEqual(true)
        expect(result.durations.quarter.enabled).toEqual(true)
        expect(result.durations.half.enabled).toEqual(true)
        expect(result.durations.whole.enabled).toEqual(true)
      })

      it('should have the rest active and enabled', () => {
        expect(result.rest.enabled).toEqual(true)
        expect(result.rest.active).toEqual(true)
      })
    })
  })
})
