//@flow

import React, { PureComponent } from 'react'
import { ACCIDENTAL, DURATION, BOX } from '../constants'
import type { AccidentalType, DurationType, BoxType } from '../constants'
import ToolGroup from './ToolGroup'

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
      <div>
        <p>Accidentals:</p>
        <ToolGroup currentSelection={selectedAccidental} allowedValues={[ACCIDENTAL.FLAT, ACCIDENTAL.NATURAL, ACCIDENTAL.SHARP]} setValue={this.props.setAccidental} boxType={BOX.ACCIDENTAL}/>
          <br/>
          <p>Durations:</p>
        <ToolGroup currentSelection={selectedDuration} allowedValues={[DURATION.EIGHTH, DURATION.QUARTER, DURATION.HALF, DURATION.WHOLE]} setValue={this.props.setDuration} boxType={BOX.DURATION}/>

      </div>
    )
  }
}

export default ToolboxStub
