//@flow
import RangeComparor from 'modules/grading/comparison.range'

describe('stringToNote', () => {

  beforeEach(() => {
  })

  it('Returns true for value within range.', () => {
    let input = "C5, G4:A5";
    let result = RangeComparor.check(input);
    expect(result).toEqual(true);
  })
  it('Returns false for value outside range.', () => {
    let input = "C3, G4:A5";
    let result = RangeComparor.check(input);
    expect(result).toEqual(false);
  })
  it('Returns true for value on edge of range.', () => {
    let input = "G4, G4:A5";
    let result = RangeComparor.check(input);
    expect(result).toEqual(true);
  })
  it('Functions with flats.', () => {
    let input = "F4, Gbb4:Abb5";
    let result = RangeComparor.check(input);
    expect(result).toEqual(true);
  })
  it('Functions with sharps.', () => {
    let input = "F##4, G4:A#5";
    let result = RangeComparor.check(input);
    expect(result).toEqual(true);
  })
})
