// @flow

import styled from 'styled-components'

const ToolboxIcons = styled.div`
  display: inline-block;
  height: 24px;
  width: 24px;
`
export const RestIcon = styled(ToolboxIcons)`
  background-image: url(/assets/toolbox/rest.quarter.svg);
`
export const DotIcon = styled(ToolboxIcons)`
  background-image: url(/assets/toolbox/dot.svg);
`

export default ToolboxIcons
