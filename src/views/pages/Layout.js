// @flow

import React, { Component } from 'react'
import styled from 'styled-components'
import colors from 'views/styles/colors'
import { NavLink } from 'react-router-dom'

export default class Layout extends Component {
  renderMenu(): React.Element<any>|null {
    if (this.props.hideMenu) {
      return null
    }

    return(
      <Menu>
        <MenuItem to={'/'} exact>Document List</MenuItem>
        <MenuItem to={'/document'}>Document</MenuItem>
        <MenuItem to={'/preview'}>Preview</MenuItem>
        <MenuItem to={'/examples'}>Stave Examples</MenuItem>
      </Menu>
    )
  }

  render(): React.Element<any> {
    return (
      <Container className="app">
        <Header>
          {this.props.title}
        </Header>

        {this.renderMenu()}

        {this.props.children}
      </Container>
    )
  }
}

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: stretch;
`
const Header = styled.div`
  background-color: ${colors.white};
  height: 2rem;
  padding: 25px;
  color: ${colors.teal};
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  font-size: 1.5rem;
  font-weight: 700;
`
const Menu = styled.div`
  position: absolute;
  left: 50px;
  top: 43px;
`
const MenuItem = styled(NavLink)`
  padding: 12px 0;
  background-color: transparent;
  border-width: 0px;
  border-bottom: 'none';
  bottom: -1px;
  display: inline-block;
  margin-right: 40px;

  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.4px;
  color: ${colors.grey};
  cursor: pointer;
  font-weight: 700;
  text-decoration: none;

  &.active {
    color: ${colors.teal};
    border-bottom: 2px solid #008489;
  }
`
