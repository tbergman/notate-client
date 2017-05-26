// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { Flow } from 'vexflow'
import { studentAddedNote } from 'modules/student-test/actions'
import type { Question as QuestionType } from 'modules/student-test'
import type { StaveNote } from 'modules/types'

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
  addNote?: Function,
  layers?: Array<Layer>
}

class Stave extends Component {
  staveContainer: React.Element<any>
  artist: Artist
  props: Props

  drawLayers() {
    const { layers = [] } = this.props
    _.each(layers, x => { this.artist.drawLayer(x.data, x.id) })
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
      addNote: (position, pitch) => this.props.addNote && this.props.addNote(position, pitch),
    })

    const vextab = new VexTab(this.artist)
    const renderer = new Flow.Renderer(this.staveContainer, Flow.Renderer.Backends.SVG)
    vextab.parse(notation)

    this.artist.render(renderer)

    this.drawLayers()
  }

  baseLayerNotation(): string {
    const ghostNotes = Array(this.props.question && this.props.question.bars)
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

export default connect(
  null,
  { studentAddedNote }
)(Stave)
