// @flow
export const ACCIDENTAL = {
    NATURAL: 0,
    SHARP: 1,
    DOUBLE_SHARP: 2,
    FLAT: -1,
    DOUBLE_FLAT: -2,
}
export const DURATION = {
    EIGHTH: 8,
    QUARTER: 4,
    HALF: 2,
    WHOLE: 1,
}
export const BOX = {
    ACCIDENTAL: 0,
    DURATION: 1
}
export type AccidentalType = -2 | -1 | 0 | 1 | 2
export type DurationType = 8 | 4 | 2 | 1
export type BoxType = 0 | 1
