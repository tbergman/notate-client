/**
 * Created by Andy on 4/8/2017.
 */
// @flow
import React, { Component} from 'react'
import './Chord.css'

/*
* Chord object contains all notes that fall under a single duration (even for single notes)
* the component returns a div whose flex-grow property is dependent on the duration passed in.
* The chord component expects the following props:
* notes : an array of note objects to be contained in the chord
* duration : a float with the duration of the note with respect to a whole note (ie, 0.25 == quarter note)
* */
class Chord extends Component{
    constructor(props){
        super(props);
        var noteArray = props.notes;
        var style = {
            display : 'flex',
            flexFlow : 'column nowrap',
            flexGrow : props.duration,
            height: '100%'
        }
        this.state = {
            notes : noteArray,
            duration : props.duration,
            style: style,
        };
        //eslint-disable-next-line
        this.state.divs = this.chordDivs();
    }

    //adds a note to the given chord
    addNote(note){
        this.setState(function(prevState, props) {
            var tmp = prevState.notes.slice();
            tmp.push(note);
            return {
                notes: tmp,
                duration: prevState.duration
            };
        });
    }

    //creates divs for each staff line and fills them in if that note is contained in the chord
    chordDivs(){
        var divs = []
        for(var i = 0; i<9; i++){
            if(this.containsNoteIndex(i)){
                divs.unshift(<div key={i} className="note"></div>)
            }
            else{
                divs.unshift(<div key={i} className="noNote"></div>)
            }
        }
        return divs;
    }

    //checks if current chord contains a particular index of note
    containsNoteIndex(index){
        for(var note of this.state.notes){
            if(note.index === index){
                return true;
            }
        }
        return false;
    }


    render(): React.Element<any> {
    return (
        <div style={this.state.style}>
            {this.state.divs}
        </div>
    )
    }
}

export default Chord;