//@flow

import React, { PureComponent } from 'react'
import { ACCIDENTAL, DURATION, BOX } from '../constants'
import type { AccidentalType, DurationType} from '../constants'
import ToolGroup from './ToolGroup'
import styled from 'styled-components';

const ToolContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

type DispatchProps = {
    setAccidental: Function,
    setDuration: Function,
}

type StateProps = {
    selectedAccidental: AccidentalType,
    selectedDuration: DurationType
}

type Props = DispatchProps & StateProps

class ToolboxStub extends PureComponent {

  props: Props

  render(): React.Element<any> {
    const { selectedAccidental, selectedDuration } = this.props;
    return (
      <ToolContainer>

        <ToolGroup currentSelection={selectedAccidental} allowedValues={[ACCIDENTAL.FLAT, ACCIDENTAL.NATURAL, ACCIDENTAL.SHARP]} setValue={this.props.setAccidental} boxType={BOX.ACCIDENTAL}/>
          <br/>

        <ToolGroup currentSelection={selectedDuration} allowedValues={[DURATION.EIGHTH, DURATION.QUARTER, DURATION.HALF, DURATION.WHOLE]} setValue={this.props.setDuration} boxType={BOX.DURATION}/>

      </ToolContainer>
    )
  }
}

export default ToolboxStub
