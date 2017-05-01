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
  description: string,
  notation: string
}

class Stave extends Component {
  staveContainer: React.Element<any>
  props: Props

  componentDidMount() {
    const { width = 500, height = 500, clef = 'treble' } = this.props
    const artist = new Artist(10, 10, 600, {scale: 0.8});
    const vextab = new VexTab(artist);
    const renderer = new Flow.Renderer(this.staveContainer, Flow.Renderer.Backends.SVG)
    renderer.resize(width, height)

    vextab.reset();
    artist.reset();
    vextab.parse(this.props.notation);
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
