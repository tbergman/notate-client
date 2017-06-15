// @flow
import { ACCIDENTAL, DURATION } from 'modules/toolbox'
import type { StaveNote } from 'modules/types'




const Utils = {

  stringToNote(input: string): StaveNote{
    var count = 1;
    var accidentalString = "";
    while(count < input.length){
      if(input.charAt(count) === 'b' || input.charAt(count) === '#'){
        accidentalString += input.charAt(count);
      }
      count++;
    }
    var accidental = ACCIDENTAL.NONE;

    if(accidentalString.length > 0){
      if(accidentalString.charAt(0) === 'b'){
        if(accidentalString.length === 1){
          accidental = ACCIDENTAL.FLAT;
        }
        else if(accidentalString.length === 2){
          accidental = ACCIDENTAL.DOUBLE_FLAT;
        }
      }
      else if(accidentalString.charAt(0) === '#'){
        if(accidentalString.length === 1){
          accidental = ACCIDENTAL.SHARP;
        }
        else if(accidentalString.length === 2){
          accidental = ACCIDENTAL.DOUBLE_SHARP;
        }
      }
    }

    return Utils.createNote(input.charAt(0)+"/"+input.substring(1+accidentalString.length), accidental);

  },

  createNote(pitch: string, accidental: string = ACCIDENTAL.NONE): StaveNote{
    const note = {
      id: "",
      staveLayerId: 'stave-layer-id',
      pitch: pitch,
      duration: DURATION.QUARTER,
      accidental: accidental,
      position: 0,
      isRest: false,
      isDotted: false,
      className: 'question',
      validators: [(() => true)]
    }
    return note;
  }

}

export default Utils
