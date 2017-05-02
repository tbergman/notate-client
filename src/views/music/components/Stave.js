// @flow

import React, { Component } from 'react'
import { Flow } from 'vexflow'
import _ from 'lodash'

import VexTab from '../../../modules/music/notation/vextab'
import Artist from '../../../modules/music/notation/artist'

type Props = {
  width?: number,
  height?: number,
  clef?: string,
  keySignature?: string,
  time?: string,
  description: string,
  notes: string
}

class Stave extends Component {
  staveContainer: React.Element<any>
  props: Props

  componentDidMount() {
    const {
      width = 500,
      height = 500,
      clef = 'treble',
      keySignature = 'C',
      time = '4/4'
    } = this.props

    const artist = new Artist(10, 10, 600, {scale: 0.8});
    const vextab = new VexTab(artist);
    const renderer = new Flow.Renderer(this.staveContainer, Flow.Renderer.Backends.SVG)
    renderer.resize(width, height)

    const notation = `
      stave notation=true tablature=false
        key=${keySignature.trim()}
        time=${time.trim()}
        clef=${clef.trim()}
      notes ${this.props.notes.trim()}
    `
    vextab.reset();
    artist.reset();
    vextab.parse(notation);
    artist.render(renderer);
  }

  render(): React.Element<any> {
    return (
      <div>
        <div className="description">
          {this.props.description}
        </div>

        <div className="stave" ref={(div) => { this.staveContainer = div }}>

        </div>
      </div>
    )
  }
}

export default Stave
