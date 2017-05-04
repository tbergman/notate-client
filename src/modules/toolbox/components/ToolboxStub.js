//@flow

import React, { PureComponent } from 'react'
import { ACCIDENTAL, DURATION } from '../constants'

type DispatchProps = {
  setAccidental: Function,
  setDuration: Function,
}

type StateProps = {
  selectedAccidental: number,
}

type Props = DispatchProps & StateProps

class ToolboxStub extends PureComponent {

  props: Props

  handleAccidentalClick = (accidental: number) => {
    this.props.setAccidental(accidental)
  }

  handleDurationClick = (duration: number) => {
    this.props.setDuration(duration)
  }

  render(): React.Element<any> {
    const { selectedAccidental } = this.props
    return (
      <div>
        <p>
          <a href='#' onClick={() => this.handleAccidentalClick(ACCIDENTAL.SHARP)}>Set accidental to "1"</a>
          <br />
          <a href='#' onClick={() => this.handleAccidentalClick(ACCIDENTAL.NATURAL)}>Set accidental to "0"</a>
        </p>
        <p>
          <a href='#' onClick={() => this.handleDurationClick(DURATION.WHOLE)}>Set duration to whole</a>
          <br />
          <a href='#' onClick={() => this.handleDurationClick(DURATION.QUARTER)}>Set duration to quarter</a>
        </p>
        <p>My selected accidental is {selectedAccidental}</p>
        {/*<ToolGroup name="accidentals" clickHandler="{this.props.setAccidental}">*/}
          {/*<Tool></Tool>*/}
        {/*</ToolGroup>*/}
        {/*<ToolGroup name="durations" clickHandler="{this.props.setDuration}">*/}
          {/*<Tool></Tool>*/}
        {/*</ToolGroup>*/}
      </div>
    )
  }
}

export default ToolboxStub
