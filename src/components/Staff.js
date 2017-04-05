// @flow

import React, { Component} from 'react'
import './Staff.css'
import Measure from './Measure'
import Note from './Note'

class Staff extends Component {

    /*
    * The Staff component is the main container for all other components. It creates
    * a background set of divs vertically spaced with flex-box and then overlays
    * all of its measures on top.
    * Its constructor expects the following props:
    * curKey : string containing the current key of the staff
    * curClef : string containing the current clef of the staff
    * TODO: add time signature as props
    * */
    constructor(props){
        super(props);
        this.measureRefs = []
        this.arrayKey = 0;
        var measureArray = [];

        //create first measure
        var m = <Measure ref={instance => {this.measureRefs.push(instance);}}
                         time={[4,4]} keySig={props.curKey} clef={props.curClef}
                            key={this.arrayKey}/>
        measureArray.push(m);
        this.state = {
            measures : measureArray,
            curKey: props.curKey,
            curClef: props.curClef,
            divs: this.staffDivs(),

            //these are just for the form entry for testing
            noteVal: "e4",
            noteDur: "1/4"
        };

        //also just used for the testing form
        this.changeDur = this.changeDur.bind(this);
        this.changeNote = this.changeNote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //add empty measure to the staff
    addMeasure(){
        var m = <Measure ref={instance => {this.measureRefs.push(instance);}}
                           time={[4,4]} keySig={this.state.curKey} clef={this.state.curClef}
                            key={this.arrayKey++}/>

        this.setState(function(prevState, props) {
            var tmp = prevState.measures.slice();
            tmp.push(m);
            return {
                measures: tmp,
                curKey: prevState.curKey,
                curClef: prevState.curClef,
                noteVal: "",
                noteDur: 0
            };
        });
    }

    //returns unicode for the current clef
    //TODO: make this state based
    clefCode(){
        if(this.state.curClef === "Treble"){
            return "&#x1D11E";
        }
    }

    //test note char with &#x1D158;
    //returns the row divs for the staff background
   staffDivs(){
        var divs = [];

        for(var i = 0; i<9; i++){
            if(i%2 === 0){
                divs.push(<div key={i} className="StaffRowLine"></div>);
            }
            else{
                divs.push(<div key={i} className="StaffRowSpace"></div>);
            }
        }
        return divs;
    }


    //TODO: replace the form entry system with event handlers on the divs
    changeDur(event) {
        this.setState({noteDur: event.target.value});
    }
    changeNote(event) {
        this.setState({noteVal: event.target.value});
    }
    handleSubmit(event) {
        this.measureRefs[0].addChord([new Note(this.state.noteVal,0)], this.parseFraction(this.state.noteDur));
        event.preventDefault();
    }
    parseFraction(input){
       var split = input.split('/');
       return parseInt(split[0], 10)/parseInt(split[1],10);
    }

    render(): React.Element<any> {
        return (
            <div>
            <div className="Container">

                {/*create the background staff lines*/}
                <div className="BackgroundStaff">
                    {this.state.divs}
                </div>


                {/*Add all the measures to the staff*/}
                {this.state.measures}


                {/*Just a form for testing purposes:*/}
            </div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Note (e4 - f5):
                        <input type="text" value={this.state.noteVal} onChange={this.changeNote} />
                    </label>
                    <label>
                        Duration (Fraction):
                        <input type="text" value={this.state.noteDur} onChange={this.changeDur} />
                    </label>
                    <input type="submit" value="Add Note" />
                </form>
            </div>
        )
    }

}

export default Staff;
