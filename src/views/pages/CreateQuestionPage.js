// @flow

import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import Layout from './Layout'
import Toolbox from 'views/toolbox/Toolbox'
import Stave from 'views/music/Stave'

class CreateQuestionPage extends Component {
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
            <QuestionStave description={'What will the question look like?'} notes={`
              :q C/4 :q D/4 :q E/4 :q F/4
            `}/>
            <AnswersStave description={'What would the answers be?'} notes={`
              :q ## #99# #99# #99#
            `}/>
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
const QuestionStave = styled(Stave)`
`
const AnswersStave = styled(Stave)`
  margin-top: 30px;
`


export default connect(state => ({}))(CreateQuestionPage)
