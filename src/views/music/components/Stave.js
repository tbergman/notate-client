// @flow

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Vex, { Flow } from 'vexflow'
import cuid from 'cuid'

class Stave extends Component {
  context: Flow.SvgContext;
  tickContext: Flow.TickContext;
  stave: Flow.Stave;
  staveContainer: React.Element<any>;

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
  }

  componentDidMount() {
    const width = this.props.width || 500
    const height = this.props.height || 500
    const renderer = new Flow.Renderer(this.staveContainer, Flow.Renderer.Backends.SVG)
    renderer.resize(width, height)

    this.context = renderer.getContext()
    this.tickContext = new Flow.TickContext()
    this.stave = new Flow.Stave(10, 10, 10000).addClef('treble')
    this.stave.setContext(this.context).draw()
  }

  render(): React.Element<any> {
    return (
      <div id={cuid()} className="stave" ref={(div) => { this.staveContainer = div }}>
        {this.props.children}
      </div>
    )
  }
}

export default Stave
