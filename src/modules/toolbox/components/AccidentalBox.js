// @flow

import React, {PureComponent} from 'react'
import styled from 'styled-components';

const Selected = styled.div`
  background-color: #b3d9ff;
`;

type Props = {
    selected: number,
    allowedAccidentals: Array<number>,
    onSelectAccidental: Function,
}

/*
* This component is just a subcomponent of the toolbox that only contains
* the selection of accidentals. It requires the following props:
* selected - a number indicating the selected accidental
* allowedAccidentals - an array indicating the accidentals allowed for this assignment
* onSelectAccidental - the accidental select function
* */
class AccidentalBox extends PureComponent{
    props: Props


    render(): React.Element<any> {
        return (
            <div>
                {this.boxDivs()}
            </div>
        )
    }

    selectEvent(){

    }
    /*
     *This function creates an array with divs for each accidental (just -1,0, and 1)
     * for now. For each div, a listener is assigned for on click.
     */
    boxDivs(): Array<React.Element<any>>{
        var divs = [];
        for(var i = 0; i<this.props.allowedAccidentals.length; i++){
            var accidental = this.props.allowedAccidentals[i];
            if(accidental === this.props.selected){
                divs.push(
                    <Selected key={accidental} onClick={() => this.props.onSelectAccidental(0).bind(this)}>
                        {accidental}
                    </Selected>
                );
            }
            else{
                divs.push(
                    <div key={accidental} onClick={() => this.props.onSelectAccidental(0).bind(this)}>
                        {accidental}
                    </div>
                );
            }
        }
        return divs;
    }

}
export default AccidentalBox;