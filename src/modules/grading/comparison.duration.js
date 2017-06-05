// @flow

import type { StaveNote } from 'modules/types'

const DurationComparison = {
  equal: (answer: StaveNote) => {
    return (student: StaveNote) =>
      student.duration === answer.duration
  },
}

export default DurationComparison
