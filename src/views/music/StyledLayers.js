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
      stroke: rgba(0,0,0,0.5);
      fill: rgba(0,0,0,0.5);
    }
  }

  .note-question {
    stroke: black;
    fill: black;
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
