// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { shouldHighlightNoteSpecificItems } from 'modules/toolbox/selectors'
import { ACCIDENTAL, DURATION } from 'modules/toolbox'
import { RestIcon, DotIcon, SelectionToolIcon, EraserIcon } from 'views/toolbox/ToolboxIcons'
import AccidentalIcons from 'views/toolbox/AccidentalIcons'
import DurationIcons from 'views/toolbox/DurationIcons'
import ToolboxItem from 'views/toolbox/ToolboxItem'
import AccidentalToolboxItem from 'views/toolbox/AccidentalToolboxItem'
import DurationToolboxItem from 'views/toolbox/DurationToolboxItem'
import {
  toggleRest,
  toggleDot,
  toggleSelectionTool,
  toggleEraser,
} from 'modules/toolbox/actions'

class Toolbox extends Component {
  render(): React.Element<any> {
    return (
      <div>
        <ToolboxContainer>
          <ToolboxItem bar
            selected={this.props.selectionTool}
            onClick={() => this.props.toggleSelectionTool()}
            icon={<SelectionToolIcon />}
          />

          <ToolboxItem bar
            selected={this.props.eraserSelected}
            onClick={() => this.props.toggleEraser()}
            icon={<EraserIcon />}
          />

          <DurationToolboxItem bar duration={DURATION.EIGHTH} icon={<DurationIcons.Eighth />} />
          <DurationToolboxItem bar duration={DURATION.QUARTER} icon={<DurationIcons.Quarter />} />
          <DurationToolboxItem bar duration={DURATION.HALF} icon={<DurationIcons.Half />} />
          <DurationToolboxItem duration={DURATION.WHOLE} icon={<DurationIcons.Whole />} />
        </ToolboxContainer>

        <ToolboxContainer>
          <AccidentalToolboxItem bar accidental={ACCIDENTAL.NATURAL} icon={<AccidentalIcons.Natural />} />
          <AccidentalToolboxItem bar accidental={ACCIDENTAL.SHARP} icon={<AccidentalIcons.Sharp />} />
          <AccidentalToolboxItem bar accidental={ACCIDENTAL.DOUBLE_SHARP} icon={<AccidentalIcons.DoubleSharp />} />
          <AccidentalToolboxItem bar accidental={ACCIDENTAL.FLAT} icon={<AccidentalIcons.Flat />} />
          <AccidentalToolboxItem bar accidental={ACCIDENTAL.DOUBLE_FLAT} icon={<AccidentalIcons.DoubleFlat />} />

          <ToolboxItem bar
            selected={this.props.restSelected && this.props.shouldHighlightNoteSpecificItems}
            disabled={this.props.eraserSelected}
            onClick={() => this.props.toggleRest()}
            icon={<RestIcon />}
          />

          <ToolboxItem
            selected={this.props.dotSelected && this.props.shouldHighlightNoteSpecificItems}
            disabled={this.props.eraserSelected}
            onClick={() => this.props.toggleDot()}
            icon={<DotIcon />}
          />
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
    toggleRest: (() => dispatch(toggleRest())),
    toggleDot: (() => dispatch(toggleDot())),
    toggleEraser: (() => dispatch(toggleEraser())),
    toggleSelectionTool: (() => dispatch(toggleSelectionTool())),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbox)
