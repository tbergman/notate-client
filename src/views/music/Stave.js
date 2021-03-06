// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import uuid from 'uuid'

import type { StaveNote } from 'modules/types'
import type { ToolboxState } from 'modules/toolbox'
import { addNote, removeNote } from 'modules/notes/actions'
import { selectNote } from 'modules/toolbox/actions'
import { selectStaveNotes } from 'modules/notes/selectors'

import { Flow } from 'vexflow'
import VexTab from 'modules/notation/vextab'
import Artist from 'modules/notation/artist'
import StyledLayers from './StyledLayers'

type Layer = {
  id: string,
  className: string,
}

type OwnProps = {
  width?: number,
  height?: number,
  clef?: string,
  keySignature?: string,
  time?: string,
  description?: string,
  notes: string,
  annotations?: string,
  measures?: number,
  layers?: Array<Layer>,
  editingStaveId?: string,
  onBeforeAddingNote?: Function,
}
type StateProps = {
  toolbox: ToolboxState,
  selectStaveNotes: Function,
}
type DispatchProps = {
  addNote: Function,
  removeNote: Function,
  selectNote: Function,
}
type Props = OwnProps & StateProps & DispatchProps
type ReactEnhancedElement = React.Element<any> & {
  removeChild: Function,
  firstChild: ReactEnhancedElement,
}

export class StaveUnconnected extends Component {
  staveContainer: ReactEnhancedElement
  artist: Artist
  props: Props

  drawLayers() {
    const {
      layers = [],
      toolbox,
    } = this.props

    this.artist.setToolbox(toolbox)

    this.artist.drawOptions()

    this.artist.clearLayers()

    _.each(layers, x => { this.artist.drawLayer(x, this.props.selectStaveNotes(x.id)) })
  }

  clearStave() {
    while (this.staveContainer.firstChild) {
      this.staveContainer.removeChild(this.staveContainer.firstChild)
    }
  }

  renderStave() {
    const {
      width = 800,
      clef = 'treble',
      keySignature = 'C',
      time = '4/4',
      annotations = '',
      notes = '',
    } = this.props

    const text = (annotations ? `text ${annotations}` : '')
    const notation = `
      stave notation=true tablature=false
        key=${keySignature.trim()}
        time=${time.trim()}
        clef=${clef.trim()}
      notes ${(notes.trim() || this.baseLayerNotation())}
      ${text}
    `
    this.artist = new Artist(10, 10, width, {
      addNote: (position, pitch) => this.addNote(position, pitch),
      selectNote: (note) => this.selectNote(note),
      clef: clef,
    })

    const vextab = new VexTab(this.artist)
    const renderer = new Flow.Renderer(this.staveContainer, Flow.Renderer.Backends.SVG)
    vextab.parse(notation)

    this.artist.render(renderer)

    this.drawLayers()
  }

  componentDidUpdate(nextProps: Props) {
    const clefChanged = nextProps.clef !== this.props.clef
    const keyChanged = nextProps.keySignature !== this.props.keySignature
    const timeChanged = nextProps.time !== this.props.time
    const measuresChanged = nextProps.measures !== this.props.measures

    if (clefChanged || keyChanged || timeChanged || measuresChanged) {
      this.clearStave()
      this.renderStave()
    } else {
      this.drawLayers()
    }
  }

  componentDidMount() {
    this.renderStave()
  }

  addNote(position: number, pitch: string) {
    let newNote = {
      id: uuid(),
      staveLayerId: this.props.editingStaveId,
      pitch: pitch,
      duration: this.props.toolbox.selectedDuration,
      accidental: this.props.toolbox.selectedAccidental,
      position: position,
      isRest: this.props.toolbox.restSelected,
      isDotted: this.props.toolbox.dotSelected,
    }

    if (this.props.onBeforeAddingNote) {
      newNote = this.props.onBeforeAddingNote(newNote)
    }

    this.props.addNote(newNote)
  }

  selectNote(note: StaveNote) {
    if (!!(this.props.toolbox && this.props.toolbox.eraserSelected)) {
      this.props.removeNote && this.props.removeNote(note)
    } else {
      this.props.selectNote && this.props.selectNote(note)
    }
  }

  baseLayerNotation(): string {
    const bars = this.props.measures || 4
    const ghostNotes = Array(bars)
      .fill(':q #99# #99# #99# #99#')

    return ghostNotes.join(' | ') + '=||'
  }

  render(): React.Element<any> {
    return (
      <StyledLayers>
        <div className="description">
          {this.props.description}
        </div>

        <div className="stave" ref={(div) => { this.staveContainer = div }} />
      </StyledLayers>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    toolbox: state.toolbox,
    selectStaveNotes: selectStaveNotes(state),
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    addNote: ((note) => dispatch(addNote(note))),
    removeNote: ((note) => dispatch(removeNote(note))),
    selectNote: ((note) => dispatch(selectNote(note))),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(StaveUnconnected)
