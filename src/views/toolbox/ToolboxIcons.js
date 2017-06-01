// @flow

import styled from 'styled-components'

const ToolboxIcons = styled.div`
  display: inline-block;
  height: 24px;
  width: 24px;
`
export const Rest = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/rest.quarter.svg);
`
export const Dot = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/dot.svg);
`
export const SelectionTool = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/selection.svg);
`
export const Eraser = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/eraser.svg);
`
export const AccidentalSharp = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/accidental.sharp.svg);
`
export const AccidentalDoubleSharp = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/accidental.double.sharp.svg);
`
export const AccidentalFlat = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/accidental.flat.svg);
`
export const AccidentalDoubleFlat = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/accidental.double.flat.svg);
`
export const AccidentalNatural = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/accidental.natural.svg);
`
export const DurationWhole = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/duration.whole.svg);
`
export const DurationHalf = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/duration.half.svg);
`
export const DurationQuarter = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/duration.quarter.svg);
`
export const DurationEighth = ToolboxIcons.extend`
  background-image: url(/assets/toolbox/duration.eighth.svg);
`

export default ToolboxIcons
