// @flow

import styled from 'styled-components'
import colors from 'views/styles/colors'
import { lighten } from 'polished'

export default styled.div`
  .layer-base {
    stroke: ${colors.black};
    fill: ${colors.black};
  }

  .note-option {
    stroke: transparent;
    fill: transparent;

    .hovered {
      fill: rgba(0,0,0,0.5);
      stroke: rgba(0,0,0,0.5);
    }
  }

  .note-layer {
    &.note-selected {
      stroke: ${colors.mustard};
      fill: ${colors.mustard};
    }

    &:hover:not(.note-selected) {
      stroke: ${lighten(0.1, colors.mustard)};
      fill: ${lighten(0.1, colors.mustard)};
    }
  }

  .note-question {
    stroke: ${colors.black};
    fill: ${colors.black};
  }

  .note-student {
    stroke: ${colors.darkSeaGreen};
    fill: ${colors.darkSeaGreen};
  }

  .note-answer {
    stroke: ${colors.teal};
    fill: ${colors.teal};
  }
  
  .note-correct {
    stroke: ${colors.brightGreen};
    fill: ${colors.brightGreen};
  }
  
  .note-incorrect {
    stroke: ${colors.red};
    fill: ${colors.red};
  }
`
