// @flow

import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Layout from './Layout'
import Toolbox from 'views/toolbox/Toolbox'
import Stave from 'views/music/Stave'
import PitchComparison from 'modules/grading/comparison.pitch'

class CreateQuestionPage extends Component {
  onBeforeAddingNote(note) {
    note.validator = PitchComparison.equal(note.pitch)
    return note
  }

  render(): React.Element<any> {
    return (
      <Layout className="app">
        <div className="header">
          <h2>Create Questions</h2>
        </div>

        <PageContainer>
          <ToolboxContainer>
            <Toolbox />
          </ToolboxContainer>

          <QuestionContainer>
            <Stave description={'What will the question look like?'}
              editingStaveId={'question'}
              layers={[
                { id: 'question' }
              ]}
            />

            <Stave description={'What would the answers be?'}
              editingStaveId={'answer'}
              onBeforeAddingNote={(note) => this.onBeforeAddingNote(note) }
              layers={[
                { id: 'question' },
                { id: 'answer' }
              ]}
            />

            <Stave description={'Answer here as a student would'}
              editingStaveId={'student'}
              layers={[
                { id: 'question' },
                { id: 'student' }
              ]}
            />
          </QuestionContainer>
        </PageContainer>
      </Layout>
    )
  }
}

const PageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
`
const ToolboxContainer = styled.div`
  flex: 3;
  box-shadow: 2px 0 5px -2px rgba(0, 0, 0, 0.2);
  padding: 30px;
`
const QuestionContainer = styled.div`
  flex: 7;
  padding: 30px;
`
const mapStateToProps = (state) => { return { } }
export default connect(mapStateToProps)(CreateQuestionPage)
