// @flow

import React, { Component } from 'react'

import Stave from '../../music/components/Stave'
type Props = {
  index: string,
  statement: string,
  notation: string,
}

export default class Question extends Component {
  props: Props

  render(): React.Element<any> {
    return (
      <div className="question">
        <div className="question-index">
          {this.props.index}
        </div>
        <div className="question-statement">
          {this.props.statement}
        </div>
        <div className="question-notation">
          <Stave notes={this.props.notation} />
        </div>
      </div>
    )
  }
}
