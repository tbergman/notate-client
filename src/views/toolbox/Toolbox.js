// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import styled from 'styled-components'
import { setDuration, setAccidental } from 'modules/toolbox/actions'
import { ACCIDENTAL, DURATION } from 'modules/toolbox'
import AccidentalIcons from 'views/toolbox/AccidentalIcons'

class Toolbox extends Component {
  selectEraser() { }

  render(): React.Element<any> {
    return (
      <ToolboxContainer>
        <ToolboxItem bar onClick={() => this.props.setDuration(DURATION.EIGHTH)}>e</ToolboxItem>
        <ToolboxItem bar onClick={() => this.props.setDuration(DURATION.QUARTER)}>q</ToolboxItem>
        <ToolboxItem bar onClick={() => this.props.setDuration(DURATION.HALF)}>h</ToolboxItem>
        <ToolboxItem bar onClick={() => this.props.setDuration(DURATION.WHOLE)}>w</ToolboxItem>
        <ToolboxItem onClick={() => this.selectEraser()}>D</ToolboxItem>
        <ToolboxSeparator />

        <ToolboxItem bar onClick={() => this.props.setAccidental(ACCIDENTAL.NATURAL)}>
          <AccidentalIcons.Natural />
        </ToolboxItem>

        <ToolboxItem bar onClick={() => this.props.setAccidental(ACCIDENTAL.SHARP)}>
          <AccidentalIcons.Sharp />
        </ToolboxItem>

        <ToolboxItem bar onClick={() => this.props.setAccidental(ACCIDENTAL.DOUBLE_SHARP)}>
          <AccidentalIcons.DoubleSharp />
        </ToolboxItem>

        <ToolboxItem bar onClick={() => this.props.setAccidental(ACCIDENTAL.FLAT)}>
          <AccidentalIcons.Flat />
        </ToolboxItem>

        <ToolboxItem onClick={() => this.props.setAccidental(ACCIDENTAL.DOUBLE_FLAT)}>
          <AccidentalIcons.DoubleFlat />
        </ToolboxItem>
      </ToolboxContainer>
    )
  }
}

const ToolboxContainer = styled.div`
  border: 1px solid #dce0e0;
  border-radius: 4px;
  padding: 10px 2px;
  display: flex;
  height: 30px;
`
const ToolboxItem = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  border-right: ${props => props.bar ? '1px solid #dce0e0' : 'none'};
  cursor: pointer;

  &:hover {
    background-color: #dce0e0;
  }
`
const ToolboxSeparator = styled.div`
  border-right: 1px solid #dce0e0;
  margin: -10px 0;
`

export default connect(
  state => ({}),
  dispatch => ({
    setDuration: ((duration) => dispatch(setDuration(duration))),
    setAccidental: ((accidental) => dispatch(setAccidental(accidental))),
  }),
)(Toolbox)
