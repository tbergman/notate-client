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
  toggleEraser,
} from 'modules/toolbox/actions'

import { ACCIDENTAL, DURATION } from 'modules/toolbox'

import { RestIcon, DotIcon, SelectionToolIcon, EraserIcon } from 'views/toolbox/ToolboxIcons'
import AccidentalIcons from 'views/toolbox/AccidentalIcons'
import DurationIcons from 'views/toolbox/DurationIcons'

class Toolbox extends Component {

  isDurationSelected(duration) {
    return this.props.selectedDuration === duration && this.shouldHighlightNoteSpecificItems()
  }

  isAccidentalSelected(accidental) {
    return this.props.selectedAccidental === accidental && this.shouldHighlightNoteSpecificItems()
  }

  shouldHighlightNoteSpecificItems() {
    return !this.props.selectionTool || this.props.selectedNote
  }

  render(): React.Element<any> {
    return (
      <div>
        <ToolboxContainer>
          <ToolboxItem bar
            selected={this.props.selectionTool}
            onClick={() => this.props.toggleSelectionTool()}>
            <SelectionToolIcon />
          </ToolboxItem>

          <ToolboxItem bar
            selected={this.props.eraserSelected}
            onClick={() => this.props.toggleEraser()}>
            <EraserIcon />
          </ToolboxItem>

          <ToolboxItem bar
            selected={this.isDurationSelected(DURATION.EIGHTH)}
            onClick={() => this.props.setDuration(DURATION.EIGHTH)}>
            <DurationIcons.Eighth />
          </ToolboxItem>

          <ToolboxItem bar
            selected={this.isDurationSelected(DURATION.QUARTER)}
            onClick={() => this.props.setDuration(DURATION.QUARTER)}>
            <DurationIcons.Quarter />
          </ToolboxItem>

          <ToolboxItem bar
            selected={this.isDurationSelected(DURATION.HALF)}
            onClick={() => this.props.setDuration(DURATION.HALF)}>
            <DurationIcons.Half />
          </ToolboxItem>

          <ToolboxItem
            selected={this.isDurationSelected(DURATION.WHOLE)}
            onClick={() => this.props.setDuration(DURATION.WHOLE)}>
            <DurationIcons.Whole />
          </ToolboxItem>
        </ToolboxContainer>

        <ToolboxContainer>
          <ToolboxItem bar
            selected={this.isAccidentalSelected(ACCIDENTAL.NATURAL)}
            onClick={() => this.props.setAccidental(ACCIDENTAL.NATURAL)}>
            <AccidentalIcons.Natural />
          </ToolboxItem>

          <ToolboxItem bar
            selected={this.isAccidentalSelected(ACCIDENTAL.SHARP)}
            onClick={() => this.props.setAccidental(ACCIDENTAL.SHARP)}>
            <AccidentalIcons.Sharp />
          </ToolboxItem>

          <ToolboxItem bar
            selected={this.isAccidentalSelected(ACCIDENTAL.DOUBLE_SHARP)}
            onClick={() => this.props.setAccidental(ACCIDENTAL.DOUBLE_SHARP)}>
            <AccidentalIcons.DoubleSharp />
          </ToolboxItem>

          <ToolboxItem bar
            selected={this.isAccidentalSelected(ACCIDENTAL.FLAT)}
            onClick={() => this.props.setAccidental(ACCIDENTAL.FLAT)}>
            <AccidentalIcons.Flat />
          </ToolboxItem>

          <ToolboxItem bar
            selected={this.isAccidentalSelected(ACCIDENTAL.DOUBLE_FLAT)}
            onClick={() => this.props.setAccidental(ACCIDENTAL.DOUBLE_FLAT)}>
            <AccidentalIcons.DoubleFlat />
          </ToolboxItem>

          <ToolboxItem bar
            selected={this.props.restSelected && this.shouldHighlightNoteSpecificItems()}
            onClick={() => this.props.toggleRest()}>
            <RestIcon />
          </ToolboxItem>

          <ToolboxItem
            selected={this.props.dotSelected && this.shouldHighlightNoteSpecificItems()}
            onClick={() => this.props.toggleDot()}>
            <DotIcon />
          </ToolboxItem>
        </ToolboxContainer>
      </div>
    )
  }
}

const ToolboxContainer = styled.div`
  border: 1px solid #008489;
  border-radius: 4px;
  padding: 10px 2px;
  margin-bottom: 10px;
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
    eraserSelected: state.toolbox.eraserSelected,
    selectionTool: state.toolbox.selectionTool,
    selectedNote: state.toolbox.selectedNote,
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setDuration: ((duration) => dispatch(setDuration(duration))),
    setAccidental: ((accidental) => dispatch(setAccidental(accidental))),
    toggleRest: (() => dispatch(toggleRest())),
    toggleDot: (() => dispatch(toggleDot())),
    toggleEraser: (() => dispatch(toggleEraser())),
    toggleSelectionTool: (() => dispatch(toggleSelectionTool())),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox)
