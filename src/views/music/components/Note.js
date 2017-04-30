// @flow

import React, { Component } from 'react'
import { Flow } from 'vexflow'

type Props = {
  pitch: string,
  duration: number,
  stave?: Flow.Stave,
  context?: Flow.SvgContext,
  tickContext?: Flow.TickContext,
}

class Note extends Component {
  note: Flow.StemmableNote;
  props: Props

  componentDidUpdate() {
    if (!this.props.tickContext || !this.props.stave || !this.props.context) {
      return
    }

    const tickContext = this.props.tickContext
    const context = this.props.context
    const stave = this.props.stave

    const note = new Flow.StaveNote({
      keys: [this.props.pitch],
      stem_direction: 1,
      duration: this.props.duration.toString(),
    })

    tickContext.addTickable(note)
    note.setContext(context).setStave(stave)
    note.x_shift = 1
    note.draw();
    tickContext.preFormat().setX(tickContext.x + 40)
  }

  render(): React.Element<any> {
    return (<div></div>)
  }
}

export default Note
