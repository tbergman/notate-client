const PitchComparison = {
  equal: (answer) => {
    return (student) => answer === student
  },

  equalOrHigher: (answer) => {
    return (student) =>
    noteToInt(stringToNote(student)) >=
    noteToInt(stringToNote(answer))
  },

  equalOrLower: (answer) => {
    return (student) =>
      noteToInt(stringToNote(student)) <=
      noteToInt(stringToNote(answer))
  },

  sameKey: (answer) => {
    return (student) =>
      (noteToInt(stringToNote(student)) % 12) ===
      (noteToInt(stringToNote(answer)) % 12)
  },
}

// still not handling accidentals
const stringToNote = (notation) => {
  return {
    pitch: notation.split('/')[0],
    octave: notation.split('/')[1]
  }
}

const noteToInt = (note) => {
  const value = {
    'C': 1,
    'D': 3,
    'E': 5,
    'F': 6,
    'G': 8,
    'A': 10,
    'B': 12,
  }

  return (value[note.pitch] + (note.octave * 12))
}

export default PitchComparison
