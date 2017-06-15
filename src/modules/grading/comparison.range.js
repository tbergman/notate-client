// @flow
import Utils from 'modules/grading/note.string.utils'
import PitchComparison from 'modules/grading/comparison.pitch'

const RangeComparor = {
  check(input: string): boolean{
    const commaSplit = input.split(",");
    const noteString = commaSplit[0].replace(" ","");
    const rangeString = commaSplit[1].replace(" ","");
    const rangeSplit = rangeString.split(":");
    const lowerNoteString = rangeSplit[0].replace(" ","");
    const upperNoteString = rangeSplit[1].replace(" ","");

    const note = Utils.stringToNote(noteString);
    const lowerNote = Utils.stringToNote(lowerNoteString);
    const upperNote = Utils.stringToNote(upperNoteString);
    if(PitchComparison.equalOrHigher(lowerNote)(note) && PitchComparison.equalOrLower(upperNote)(note)){
      return true;
    }
    return false;
  }
}

export default RangeComparor;
