// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import styled from 'styled-components'
import {
  setDuration,
  setAccidental,
  toggleRest,
  toggleDot,
  toggleSelectionTool,
} from 'modules/toolbox/actions'

import { ACCIDENTAL, DURATION } from 'modules/toolbox'

import { RestIcon, DotIcon, SelectionToolIcon } from 'views/toolbox/ToolboxIcons'
import AccidentalIcons from 'views/toolbox/AccidentalIcons'
import DurationIcons from 'views/toolbox/DurationIcons'

class Toolbox extends Component {
  render(): React.Element<any> {
    return (
      <ToolboxContainer>
        <ToolboxItem bar
          selected={this.props.selectionTool}
          onClick={() => this.props.toggleSelectionTool()}>
          <SelectionToolIcon />
        </ToolboxItem>

        <ToolboxItem bar
          selected={this.props.selectedDuration === DURATION.EIGHTH && !this.props.selectionTool}
          onClick={() => this.props.setDuration(DURATION.EIGHTH)}>
          <DurationIcons.Eighth />
        </ToolboxItem>

        <ToolboxItem bar
          selected={this.props.selectedDuration === DURATION.QUARTER && !this.props.selectionTool}
          onClick={() => this.props.setDuration(DURATION.QUARTER)}>
          <DurationIcons.Quarter />
        </ToolboxItem>

        <ToolboxItem bar
          selected={this.props.selectedDuration === DURATION.HALF && !this.props.selectionTool}
          onClick={() => this.props.setDuration(DURATION.HALF)}>
          <DurationIcons.Half />
        </ToolboxItem>

        <ToolboxItem
          selected={this.props.selectedDuration === DURATION.WHOLE && !this.props.selectionTool}
          onClick={() => this.props.setDuration(DURATION.WHOLE)}>
          <DurationIcons.Whole />
        </ToolboxItem>

        <ToolboxSeparator />

        <ToolboxItem bar
          selected={this.props.selectedAccidental === ACCIDENTAL.NATURAL}
          onClick={() => this.props.setAccidental(ACCIDENTAL.NATURAL)}>
          <AccidentalIcons.Natural />
        </ToolboxItem>

        <ToolboxItem bar
          selected={this.props.selectedAccidental === ACCIDENTAL.SHARP}
          onClick={() => this.props.setAccidental(ACCIDENTAL.SHARP)}>
          <AccidentalIcons.Sharp />
        </ToolboxItem>

        <ToolboxItem bar
          selected={this.props.selectedAccidental === ACCIDENTAL.DOUBLE_SHARP}
          onClick={() => this.props.setAccidental(ACCIDENTAL.DOUBLE_SHARP)}>
          <AccidentalIcons.DoubleSharp />
        </ToolboxItem>

        <ToolboxItem bar
          selected={this.props.selectedAccidental === ACCIDENTAL.FLAT}
          onClick={() => this.props.setAccidental(ACCIDENTAL.FLAT)}>
          <AccidentalIcons.Flat />
        </ToolboxItem>

        <ToolboxItem bar
          selected={this.props.selectedAccidental === ACCIDENTAL.DOUBLE_FLAT}
          onClick={() => this.props.setAccidental(ACCIDENTAL.DOUBLE_FLAT)}>
          <AccidentalIcons.DoubleFlat />
        </ToolboxItem>

        <ToolboxItem bar
          selected={this.props.restSelected}
          onClick={() => this.props.toggleRest()}>
          <RestIcon />
        </ToolboxItem>

        <ToolboxItem
          selected={this.props.dotSelected}
          onClick={() => this.props.toggleDot()}>
          <DotIcon />
        </ToolboxItem>
      </ToolboxContainer>
    )
  }
}

const ToolboxContainer = styled.div`
  border: 1px solid #008489;
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
  background-color: ${props => props.selected ? '#dce0e0' : 'transparent' }
  cursor: pointer;

  &:hover {
    background-color: #dce0e0;
  }
`
const ToolboxSeparator = styled.div`
  border-right: 1px solid #008489;
  margin: -10px 0;
`

const mapStateToProps = (state) => {
  return {
    selectedDuration: state.toolbox.selectedDuration,
    selectedAccidental: state.toolbox.selectedAccidental,
    restSelected: state.toolbox.restSelected,
    dotSelected: state.toolbox.dotSelected,
    selectionTool: state.toolbox.selectionTool,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setDuration: ((duration) => dispatch(setDuration(duration))),
    setAccidental: ((accidental) => dispatch(setAccidental(accidental))),
    toggleRest: (() => dispatch(toggleRest())),
    toggleDot: (() => dispatch(toggleDot())),
    toggleSelectionTool: (() => dispatch(toggleSelectionTool())),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox)
