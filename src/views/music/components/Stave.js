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
  children?: React.Element<any>
}

class Stave extends Component {
  context: Flow.SvgContext
  tickContext: Flow.TickContext
  stave: Flow.Stave
  staveContainer: React.Element<any>

  props: Props

  state = {}

  componentDidMount() {
    const { width = 500, height = 500, clef = 'treble' } = this.props
    const renderer = new Flow.Renderer(this.staveContainer, Flow.Renderer.Backends.SVG)
    renderer.resize(width, height)

    // Initialize VexTab artist and parser.
    let artist = new Artist(10, 10, 600, {scale: 0.8});
    let vextab = new VexTab(artist);
    try {
      let notation = `
        stave notation=true tablature=false key=C time=4/4
        voice
          notes Cn-D-E/4 F#/5
        voice
          notes Dn-E-F/4 G#/5
      `
      vextab.reset();
      artist.reset();
      vextab.parse(notation);
      artist.render(renderer);
    } catch (e) {
      console.log(e);
    }
  }

  render(): React.Element<any> {
    return (
      <div className="stave" ref={(div) => { this.staveContainer = div }}>

      </div>
    )
  }
}

export default Stave
