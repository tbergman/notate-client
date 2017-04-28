//@flow

import React, { PureComponent } from 'react'

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
          <a href='#' onClick={() => this.handleAccidentalClick(1)}>Set accidental to "1"</a>
          <br />
          <a href='#' onClick={() => this.handleAccidentalClick(0)}>Set accidental to "0"</a>
        </p>
        <p>
          <a href='#' onClick={() => this.handleDurationClick(1)}>Set duration to "1"</a>
          <br />
          <a href='#' onClick={() => this.handleDurationClick(4)}>Set duration to "4"</a>
        </p>
        <p>My selected accidental is {selectedAccidental}</p>
      </div>
    )
  }
}

export default ToolboxStub
