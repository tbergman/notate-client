/**
 * Created by Andy on 4/6/2017.
 */
// @flow
import React, { Component} from 'react'
import './Measure.css'
import Chord from './Chord'

/*
* The measure object contains all the chord objects and thus is the flex container that handles
* the flex growth of its children.
*
* Expected props:
* time : a tuple containing the time signature (ie: [4,4])
* keySig : a string containing the key signature (ie: g#, Bb, etc)
* clef: a string containing clef
* */
class Measure extends Component{
    constructor(props){
        super(props);
        var chordArray = [];

        //push empty space to the array of chords
        chordArray.push(<Chord key={1} duration={props.time[0]/props.time[1]} notes={[]}/>);

        this.state = {
            chords : chordArray,
            curKey: props.keySig,
            curClef: props.clef,
            totalSpace : ((1/props.time[1]) * props.time[0])-1/2,
            time : props.time
        };

        //create starting int for the keys of the Chord children
        this.key = 0;

    }

    /*
    Add a chord to the end of the measure. Pushes the chord object into the this.state.chords,
    as well as adjusting the empty chord on the end of the array's duration. Accepts an array of
    Note objects (notes) and duration float (duration) as arguments.
    * */
    addChord(notes, duration){
        this.setState(function(prevState, props) {
            var tmp = prevState.chords.slice();

            //remove the previous empty chord
            tmp.pop();

            //push the passed in chord
            tmp.push(<Chord key={this.key++} duration={duration} notes={notes}/>);

            //set the remaining amount of space in the measure and push an appropriately sized empty chord
            var space = prevState.totalSpace - duration;
            tmp.push(<Chord key={this.key++} duration={space} notes={[]}/>);

            return {
                chords: tmp,
                curKey: prevState.curKey,
                curClef: prevState.curClef,
                totalSpace : space,
                time : prevState.time
            };
        });
    }


    render(): React.Element<any> {
        return (
            <div className="MeasureContainer">
                {this.state.chords}
            </div>
        )
    }
}

export default Measure;