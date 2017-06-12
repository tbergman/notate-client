// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import colors from 'views/styles/colors'
import { darken } from 'polished'

export default class ToolboxItem extends Component {
  render(): React.Element<any> {
    return (
      <StyledToolboxItem {...this.props}
        disabled={!this.props.item.enabled}
        selected={this.props.item.active}
        onClick={() => this.props.item.enabled && this.props.onClick()}>
        {this.props.icon}
      </StyledToolboxItem>
    )
  }
}

const StyledToolboxItem = styled.div`
  flex: 1;
  align-items: center;
  justify-content: center;
  display: flex;
  border-right: ${props => props.bar ? '1px solid' : 'none'};
  border-color: ${colors.lightGrey};
  background-color: ${props => props.selected ? colors.lightGrey : 'transparent' };
  opacity: ${props => props.disabled ? '0.25': '1'};
  cursor: pointer;

  &:hover {
    background-color: ${darken(0.1, colors.lightGrey)};
  }
`
