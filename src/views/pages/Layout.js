// @flow

import styled from 'styled-components'
import colors from 'views/styles/colors'

export default styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  align-items: stretch;

  .header {
    background-color: ${colors.white};
    height: 2rem;
    padding: 15px;
    color: ${colors.teal};
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    font-size: 1.5rem;
    font-weight: 700;
  }
`
