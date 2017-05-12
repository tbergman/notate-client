// @flow

const stringToNote = (notation) => {
  return {
    pitch: notation.split('/')[0],
    octave: parseInt(notation.split('/')[1])
  }
}

const noteToInt = (note) => {
  const value = {
    'C': 0,
    'D': 2,
    'E': 4,
    'F': 5,
    'G': 7,
    'A': 9,
    'B': 11,
  }

  return (value[note.pitch] + (note.octave * 12))
}

const PitchComparison = {
  equal: (answer: string) => {
    return (student: string) => answer === student
  },

  equalOrHigher: (answer: string) => {
    return (student: string) =>
    noteToInt(stringToNote(student)) >=
    noteToInt(stringToNote(answer))
  },

  equalOrLower: (answer: string) => {
    return (student: string) =>
      noteToInt(stringToNote(student)) <=
      noteToInt(stringToNote(answer))
  },

  sameKey: (answer: string) => {
    return (student: string) =>
      (noteToInt(stringToNote(student)) % 12) ===
      (noteToInt(stringToNote(answer)) % 12)
  },
}

export default PitchComparison
