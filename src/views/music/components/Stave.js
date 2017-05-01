// @flow

import React, { Component } from 'react'
import { Flow } from 'vexflow'

type Props = {
  width?: number,
  height?: number,
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
    const width = this.props.width || 500
    const height = this.props.height || 500

    const renderer = new Flow.Renderer(this.staveContainer, Flow.Renderer.Backends.SVG)
    renderer.resize(width, height)

    const context = renderer.getContext()
    const tickContext = new Flow.TickContext()
    const staveSvgWidth = 10000;
    const stave = new Flow.Stave(0, 0, staveSvgWidth).addClef('treble')
    stave.setContext(context).draw()

    this.setState({ context, tickContext, stave })
  }

  childrenWithProps(children?: React.Element<any>): React.Element<any> {
    return React.Children.map(children,
      (child) => {
        return React.cloneElement(child, {
          context: this.state.context,
          tickContext: this.state.tickContext,
          stave: this.state.stave
        })
      }
    )
  }

  render(): React.Element<any> {
    return (
      <div className="stave" ref={(div) => { this.staveContainer = div }}>
        {this.childrenWithProps(this.props.children)}
      </div>
    )
  }
}

export default Stave
