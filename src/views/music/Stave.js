// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import uuid from 'uuid'

import type { Question as QuestionType } from 'modules/student-test'
import type { StaveNote } from 'modules/types'
import type { ToolboxState } from 'modules/toolbox'
import { addNote, removeNote } from 'modules/notes/actions'
import { selectNote } from 'modules/toolbox/actions'
import { selectStaveNotes } from 'modules/notes/selectors'

import { Flow } from 'vexflow'
import VexTab from 'modules/music/notation/vextab'
import Artist from 'modules/music/notation/artist'
import StyledLayers from './StyledLayers'

type Layer = {
  id: string,
  data: Array<StaveNote>,
}

type Props = {
  width?: number,
  height?: number,
  clef?: string,
  keySignature?: string,
  time?: string,
  description?: string,
  notes: string,
  annotations?: string,
  question?: QuestionType,
  layers?: Array<Layer>,
  toolbox?: ToolboxState,
  editingStaveId?: string,
  onBeforeAddingNote?: Function,
}

export class StaveUnconnected extends Component {
  staveContainer: React.Element<any>
  artist: Artist
  props: Props

  drawLayers() {
    const {
      layers = [],
      toolbox,
    } = this.props

    this.artist.setToolbox(toolbox)

    this.artist.drawOptions()

    _.each(layers, x => { this.artist.drawLayer(x.id, this.props.selectStaveNotes(x.id)) })
  }

  componentDidUpdate() {
    this.drawLayers()
  }

  componentDidMount() {
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
    })

    const vextab = new VexTab(this.artist)
    const renderer = new Flow.Renderer(this.staveContainer, Flow.Renderer.Backends.SVG)
    vextab.parse(notation)

    this.artist.render(renderer)

    this.drawLayers()
  }

  addNote(position: number, pitch: string, staveLayerId: string) {
    let newNote = {
      id: uuid(),
      staveLayerId: this.props.editingStaveId,
      pitch: pitch,
      duration: this.props.toolbox.selectedDuration,
      accidental: this.props.toolbox.selectedAccidental,
      position: position,
      isRest: this.props.toolbox.restSelected,
      isDotted: this.props.toolbox.isDotted,
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
    const bars = (this.props.question && this.props.question.bars) || 4
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
