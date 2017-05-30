// @flow

import { createSelector } from 'reselect'
import { selectToolbox } from 'modules/reducers'
import { ACCIDENTAL, DURATION } from 'modules/toolbox'

export const selectSelectedAccidental = createSelector(
  selectToolbox,
  toolbox => toolbox.selectedAccidental
)

export const selectSelectedDuration = createSelector(
  selectToolbox,
  toolbox => toolbox.selectedDuration
)

export const selectToolboxItems = createSelector(
  selectToolbox,
  toolbox => {
    const shouldHighlightNoteSpecificItems =
      (!toolbox.selectionTool && !toolbox.eraserSelected)
      || toolbox.selectedNote

    const durationButton = (duration) => {
      return {
        duration: duration,
        enabled: !toolbox.eraserSelected,
        active: toolbox.selectedDuration === duration
          && shouldHighlightNoteSpecificItems,
      }
    }

    const accidentalButton = (accidental) => {
      return {
        accidental: accidental,
        enabled: !toolbox.eraserSelected,
        active: toolbox.selectedAccidental === accidental
          && !toolbox.restSelected
          && shouldHighlightNoteSpecificItems,
      }
    }

    return {
      cursor: {
        enabled: !toolbox.eraserSelected,
        active: toolbox.selectionTool,
      },
      eraser: {
        enabled: true,
        active: toolbox.eraserSelected,
      },
      rest: {
        enabled: !toolbox.eraserSelected,
        active: toolbox.restSelected && shouldHighlightNoteSpecificItems,
      },
      dot: {
        enabled: !toolbox.eraserSelected,
        active: toolbox.dotSelected && shouldHighlightNoteSpecificItems,
      },
      durations: {
        eighth: durationButton(DURATION.EIGHTH),
        quarter: durationButton(DURATION.QUARTER),
        half: durationButton(DURATION.HALF),
        whole: durationButton(DURATION.WHOLE),
      },
      accidentals: {
        natural: accidentalButton(ACCIDENTAL.NATURAL),
        sharp: accidentalButton(ACCIDENTAL.SHARP),
        doubleSharp: accidentalButton(ACCIDENTAL.DOUBLE_SHARP),
        flat: accidentalButton(ACCIDENTAL.FLAT),
        doubleFlat: accidentalButton(ACCIDENTAL.DOUBLE_FLAT),
      },
    }
  }
)
