// @flow

class Note{
    pitch: string;
    accidentals: number;
    index: number;
    kern: string;
    /*
     * General outline for a single note object.
     * Constructor expects the following:
     * a string based on the kern formatting.
     * TODO Create another constructor in case we don't want to create notes based on a kern string?
     * */
    constructor(kernString: string){
        this.kern = kernString;
        this.kernToPitch(kernString);
        this.index = this.getIndex();
    }

    /*
    * kernToPitch converts any well-formed kern note expression and converts it
    * to pitch-octave form (ie: cc -> c5)
    *
    * This function accepts a kern string as parameters.
    *
    * For now, it returns nothing, but sets the current note's pitch and accidentals
    * to the result of the kern conversion
    * */
    kernToPitch(kern: string){
        var letter = kern.toLowerCase().charAt(0);
        var octave;
        var letterCount = 1;
        var accidentalCount = 0;
        var accidentals = 0;
        if(kern.charCodeAt(0) >=97){
            octave = 4;
            while(letterCount < kern.length && kern.charCodeAt(letterCount)>= 97){
                letterCount++;
                octave++;
            }
        }
        else{
            octave = 3;
            while(letterCount < kern.length && kern.charCodeAt(letterCount)>= 65){
                letterCount++;
                octave--;
            }
        }
        while(letterCount< kern.length ){
            letterCount++;
            accidentalCount++;
        }
        if(kern.charAt(kern.length-1) === '#'){
            accidentals += accidentalCount;
        }
        else if(kern.charAt(kern.length-1) === '-'){
            accidentals -= accidentalCount;
        }
        this.accidentals = accidentals;
        this.pitch = letter+octave;
    }

    //ascii code for a is 97
    //ascii code for 0 is 48
    //gives the index based on the ascii pitch name with e4 == 0
    //TODO this will need to be modified for different clefs and ledger lines
    getIndex(): number{
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