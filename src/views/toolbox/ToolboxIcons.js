// @flow

import styled from 'styled-components'

const ToolboxIcons = styled.div`
  display: inline-block;
  height: 24px;
  width: 24px;
`
export const RestIcon = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/rest.quarter.svg);
`
export const DotIcon = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/dot.svg);
`
export const SelectionToolIcon = styled(ToolboxIcons)`
  background-image: url(/assets/toolbox/selection.svg);
`

export default ToolboxIcons
