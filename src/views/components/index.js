// @flow

import styled from 'styled-components'
import { lighten, darken } from 'polished'
import colors from 'views/styles/colors'

export const Badge = styled.div`
  color: ${props => props.color || colors.grey};
  border: 1px solid;
  border-color: ${props => darken(0.1, (props.backgroundColor || colors.eggShell))};
  background-color: ${props => (props.backgroundColor || colors.eggShell)};
  display: inline-block;
  margin-bottom: 0;
  border-radius: 4px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  font-size: 14px;
  margin-right: 10px;
  padding: 5px 10px;
  font-weight: 700;
  line-height: 1;
`

export const Button = styled.input`
  border-color: ${colors.teal};
  background-color: ${colors.teal};
  color: ${colors.white};
  display: inline-block;
  margin-bottom: 0;
  border-radius: 4px;
  border: 1px solid;
  text-align: center;
  vertical-align: middle;
  font-weight: bold;
  line-height: 1.43;
  cursor: pointer;
  padding: 9px 27px;
  font-size: 14px;
  margin-right: 10px;

  &:hover {
    background-color: ${lighten(0.05, colors.teal)};
  }
`
export const Textarea = styled.textarea`
  display: block;
  padding: 10px;
  height: 50px;
  resize: vertical;
  line-height: inherit;
  border: 1px solid #aaa;
  border-radius: 2px;
  background-color: ${colors.white};
  color: ${colors.grey};
  font-size: 14px;
`
export const Label = styled.div`
  font-weight: 700;
  color: ${colors.grey};
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.6px;
  padding: 2px 0;
  margin-bottom: 15px;
  text-align: left;
`
