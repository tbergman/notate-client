// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { selectToolboxItems } from 'modules/toolbox/selectors'
import { ACCIDENTAL, DURATION } from 'modules/toolbox'
import * as Icons from 'views/toolbox/ToolboxIcons'
import ToolboxItem from 'views/toolbox/ToolboxItem'

import {
  toggleRest,
  toggleDot,
  toggleSelectionTool,
  toggleEraser,
  setAccidental,
  setDuration,
} from 'modules/toolbox/actions'

class Toolbox extends Component {
  render(): React.Element<any> {
    const items = this.props.toolboxItems

    return (
      <div>
        <ToolboxContainer>
          <ToolboxItem bar item={items.cursor} icon={<Icons.SelectionTool />}
            onClick={() => this.props.toggleSelectionTool()}/>

          <ToolboxItem bar item={items.eraser} icon={<Icons.Eraser />}
            onClick={() => this.props.toggleEraser()}/>

          <ToolboxItem bar item={items.durations.eighth} icon={<Icons.DurationEighth />}
            onClick={() => this.props.setDuration(DURATION.EIGHTH)} />

          <ToolboxItem bar item={items.durations.quarter} icon={<Icons.DurationQuarter />}
            onClick={() => this.props.setDuration(DURATION.QUARTER)}/>

          <ToolboxItem bar item={items.durations.half} icon={<Icons.DurationHalf />}
            onClick={() => this.props.setDuration(DURATION.HALF)}/>

          <ToolboxItem item={items.durations.whole} icon={<Icons.DurationWhole />}
            onClick={() => this.props.setDuration(DURATION.WHOLE)}/>

        </ToolboxContainer>

        <ToolboxContainer>
          <ToolboxItem bar item={items.accidentals.natural} icon={<Icons.AccidentalNatural />}
            onClick={() => this.props.setAccidental(ACCIDENTAL.NATURAL)}/>

          <ToolboxItem bar item={items.accidentals.sharp} icon={<Icons.AccidentalSharp />}
            onClick={() => this.props.setAccidental(ACCIDENTAL.SHARP)}/>

          <ToolboxItem bar item={items.accidentals.doubleSharp} icon={<Icons.AccidentalDoubleSharp />}
            onClick={() => this.props.setAccidental(ACCIDENTAL.DOUBLE_SHARP)}/>

          <ToolboxItem bar item={items.accidentals.flat} icon={<Icons.AccidentalFlat />}
            onClick={() => this.props.setAccidental(ACCIDENTAL.FLAT)}/>

          <ToolboxItem bar item={items.accidentals.doubleFlat} icon={<Icons.AccidentalDoubleFlat />}
            onClick={() => this.props.setAccidental(ACCIDENTAL.DOUBLE_FLAT)}/>

          <ToolboxItem bar item={items.rest} icon={<Icons.Rest />}
            onClick={() => this.props.toggleRest()}/>

          <ToolboxItem item={items.dot} icon={<Icons.Dot />}
            onClick={() => this.props.toggleDot()}/>

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
    shouldHighlightNoteSpecificItems: shouldHighlightNoteSpecificItems(state),
    toolboxItems: selectToolboxItems(state),
    toggleRest: (() => dispatch(toggleRest())),
    toggleDot: (() => dispatch(toggleDot())),
    toggleEraser: (() => dispatch(toggleEraser())),
    toggleSelectionTool: (() => dispatch(toggleSelectionTool())),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox)
