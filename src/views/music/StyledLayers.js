// @flow

import styled from 'styled-components'

export default styled.div`
  .layer-base {
    stroke: black;
    fill: black;
  }

  .note-option {
    stroke: transparent;
    fill: transparent;

    &:hover {
      fill: rgba(0,0,0,0.5);
      stroke: rgba(0,0,0,0.5);
    }
  }

  .note-layer {
    stroke: black;
    fill: black;

    &.note-selected {
      stroke: pink;
      fill: pink;
    }
  }

  .note-student {
    stroke: green;
    fill: green;
  }

  .note-answer {
    stroke: blue;
    fill: blue;
  }
`
