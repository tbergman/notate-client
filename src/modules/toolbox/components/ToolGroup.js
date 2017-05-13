// @flow

import React, {PureComponent} from 'react'
import styled from 'styled-components';
// import {injectGlobal} from 'styled-components'
// import { ACCIDENTAL, BOX } from '../constants'
import type { AccidentalType, DurationType, BoxType } from '../constants'

const Selected = styled.div`
  background-color: #b3d9ff	;
  padding: 5px;
  border: 1px solid black;
  z-index = -1;
`;
const Unselected = styled.div`
  background-color: #DCDCDC;
  padding: 5px;
  border: 1px solid black;
  z-index = -1;
`;
const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px;
    margin: 0 auto;
`;
// injectGlobal`
//   @font-face {
//     font-family: bravura;
//     src: url("${Bravura}") format("woff");
//     font-weight: 200;
//     fount-style: normal;
//   }
// `;
//
// const BravuraFont = styled.p`
//     font-family: bravura;
// `;

type Props = {
    currentSelection: AccidentalType | DurationType,
    allowedValues: Array<AccidentalType|DurationType>,
    setValue: Function,
    boxType: BoxType
}

/*
* This component is just a subcomponent of the toolbox that only contains
* the selection of accidentals. It requires the following props:
* selected - a number indicating the selected accidental
* allowedValues - an array indicating the accidentals allowed for this assignment
* setValue - the accidental select function
* */
class ToolGroup extends PureComponent{
    props: Props


    render(): React.Element<any> {
        return (
            <Container>
                {this.boxDivs()}
            </Container>
        )
    }

    handleAccidentalClick = (accidental: AccidentalType) => {
        this.props.setValue(accidental)
    }

    /*
     *This function creates an array with divs for each accidental or duration
     * for now. For each div, a listener is assigned for on click.
     */
    boxDivs(): Array<React.Element<any>>{
        var divs = [];
        const { currentSelection, allowedValues } = this.props;
        allowedValues.forEach(
            function(value: AccidentalType|DurationType) {
                if(value === currentSelection){
                    divs.push(
                        <Selected key={value} onClick={() => this.handleAccidentalClick(value)}>
                            {value}
                        </Selected>
                    );
                }
                else{
                    divs.push(
                        <Unselected key={value} onClick={() => this.handleAccidentalClick(value)}>
                            {value}
                        </Unselected>
                    );
                }
            },
            this
        );
        return divs;
    }

    // fetchSymbol(value: AccidentalType | DurationType): React.Element<any>{
    //     if(this.props.boxType === BOX.ACCIDENTAL){
    //         switch(value){
    //             case ACCIDENTAL.DOUBLE_FLAT:
    //                 break;
    //             case ACCIDENTAL.FLAT:
    //                 break;
    //             case ACCIDENTAL.NATURAL:
    //                 break;
    //             case ACCIDENTAL.SHARP:
    //                 break;
    //             case ACCIDENTAL.DOUBLE_SHARP:
    //                 break
    //         }
    //
    //     }
    //     else if(this.props.boxType === BOX.DURATION){
    //         return null;
    //     }
    //     return null;
    // }

}
export default ToolGroup;