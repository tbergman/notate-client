/**
 * Created by Andy on 4/8/2017.
 */
// @flow
class Note{
    /*
    * General outline for a single note object.
    * Constructor expects the following:
    * pitch : string containing the pitch of the not (ie: c5)
    * accidentals : int referring to the number of accidentals on the note
    *   (0 == natural, 1 == 1 sharp, -1 === 1 flat)
    * */
    constructor(pitch,accidentals){
        this.pitch = pitch;
        this.accidentals = accidentals;
        this.index = this.getIndex();
    }
    //ascii code for a is 97
    //ascii code for 0 is 48
    //gives the index based on the ascii pitch name with e4 == 0
    //TODO this will need to be modified for different clefs and ledger lines
    getIndex(){
        var index = 0;
        var letterCode = this.pitch.charCodeAt(0);

        //cIndex is the index of the letter with c == 0
        var cIndex = 0;
        if(letterCode< 99){
            cIndex =  letterCode -92;
        }
        else{
            cIndex = letterCode - 99;
        }

        //shift index based on octave assuming c5 == 0
        index = cIndex - 7*(53-this.pitch.charCodeAt(1));

        //return index shifted down by four to the f4
        return index +5;
    }
}

export default Note;