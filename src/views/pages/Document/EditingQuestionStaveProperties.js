// @flow

import _ from 'lodash'
import React, { Component } from 'react'
import styled from 'styled-components'
import colors from 'views/styles/colors'
import { connect } from 'react-redux'
import { Label } from 'views/components'
import Select from 'react-select'
import { selectStaveNotes } from 'modules/notes/selectors'
import {
  setSelectedDescription,
  setSelectedClef,
  setSelectedTimeSignature,
  setSelectedKeySignature,
  setSelectedMeasures,
  setSelectedValidators,
} from 'modules/documents/actions'

type OwnProps = {}
type StateProps = {
  selectStaveNotes: any,
  question: any,
  selectedDescription: string,
  selectedClef: string,
  selectedTimeSignature: string,
  selectedKeySignature: string,
  selectedMeasures: number,
  selectedValidators: string,
}
type DispatchProps = {
  setSelectedClef: any,
  setSelectedTimeSignature: any,
  setSelectedKeySignature: any,
  setSelectedMeasures: any,
  setSelectedValidators: any,
}
type Props = OwnProps & StateProps & DispatchProps

class DocumentPageEditQuestion extends Component {
  props: Props;

  renderPropsDisabledLabel(disabled: boolean): React.Element<any>  {
    if (disabled) {
      return (<QuietLabel>Stave properties are disabled when notes are added</QuietLabel>)
    }

    return (<QuietLabel>&nbsp;</QuietLabel>)
  }

  render(): React.Element<any> {
    const propsDisabled = (
      this.props.selectStaveNotes(this.props.question.questionLayerId).length > 0 ||
      this.props.selectStaveNotes(this.props.question.answerLayerId).length > 0
    )

    return (
      <StaveProperties>
        <StavePropertyColumn>
          <StaveProperty>
            <StavePropertyLabel>Measures: </StavePropertyLabel>
            <StavePropertySelect name="measures" value={this.props.selectedMeasures}
              onChange={(option) => this.props.setSelectedMeasures(option.value)}
              clearable={false}
              disabled={propsDisabled}
              options={[
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
              ]}/>
          </StaveProperty>

          <StaveProperty>
            <StavePropertyLabel>Time: </StavePropertyLabel>
            <StavePropertySelect name="time-signature" value={this.props.selectedTimeSignature}
              onChange={(option) => this.props.setSelectedTimeSignature(option.value)}
              clearable={false}
              disabled={propsDisabled}
              options={[
                { value: '4/4', label: '4/4' },
                { value: '3/4', label: '3/4' },
                { value: '2/4', label: '2/4' },
                { value: '6/8', label: '6/8' },
                { value: 'C|', label: 'Cut' },
                { value: 'C', label: 'Common' },
              ]}/>
          </StaveProperty>
        </StavePropertyColumn>

        <StavePropertyColumn>
          <StaveProperty>
            <StavePropertyLabel>Clef: </StavePropertyLabel>
            <StavePropertySelect name="clef" value={this.props.selectedClef}
              onChange={(option) => this.props.setSelectedClef(option.value)}
              clearable={false}
              disabled={propsDisabled}
              options={[
                { value: 'treble', label: 'Treble' },
                { value: 'bass', label: 'Bass' },
                { value: 'alto', label: 'Alto' },
                { value: 'tenor', label: 'Tenor' },
              ]}/>
          </StaveProperty>

          <StaveProperty>
            <StavePropertyLabel>Key: </StavePropertyLabel>
            <StavePropertySelect name="key-signature" value={this.props.selectedKeySignature}
              onChange={(option) => this.props.setSelectedKeySignature(option.value)}
              clearable={false}
              disabled={propsDisabled}
              options={[
                { value: 'C', label: 'C' },
                { value: 'Am', label: 'Am' },
                { value: 'F', label: 'F' },
                { value: 'Dm', label: 'Dm' },
                { value: 'Bb', label: 'Bb' },
                { value: 'Gm', label: 'Gm' },
                { value: 'Eb', label: 'Eb' },
                { value: 'Cm', label: 'Cm' },
                { value: 'Ab', label: 'Ab' },
                { value: 'Fm', label: 'Fm' },
                { value: 'Db', label: 'Db' },
                { value: 'Bbm', label: 'Bbm' },
                { value: 'Gb', label: 'Gb' },
                { value: 'Ebm', label: 'Ebm' },
                { value: 'Cb', label: 'Cb' },
                { value: 'Abm', label: 'Abm' },
                { value: 'G', label: 'G' },
                { value: 'Em', label: 'Em' },
                { value: 'D', label: 'D' },
                { value: 'Bm', label: 'Bm' },
                { value: 'A', label: 'A' },
                { value: 'F#m', label: 'F#m' },
                { value: 'E', label: 'E' },
                { value: 'C#m', label: 'C#m' },
                { value: 'B', label: 'B' },
                { value: 'G#m', label: 'G#m' },
                { value: 'F#', label: 'F#' },
                { value: 'D#m', label: 'D#m' },
                { value: 'C#', label: 'C#' },
                { value: 'A#m', label: 'A#m' },
              ]}/>
          </StaveProperty>
        </StavePropertyColumn>

        {this.renderPropsDisabledLabel(propsDisabled)}
      </StaveProperties>
    )
  }
}

const StaveProperties = styled.div`
  flex: 1;
  display: inline-block;
  margin-left: 10px;
`
const QuietLabel = Label.extend`
  font-size: 13px;
  text-align: center;
  color: ${colors.lightGrey};
`
const StavePropertyColumn = styled.div`
  display: inline-block;
  width: 50%;
`
const StaveProperty = styled.div`
  display: flex;
`
const StavePropertyLabel = Label.extend`
  display: inline-block;
  font-size: 14px;
  width: 65px;
  margin-left: 20px;
  text-align: right;
`
const StavePropertySelect = styled(Select)`
  display: inline-block;
  font-size: 13px;
  flex: 1;
  margin-left: 15px;
  cursor: pointer;

  .Select-control, .Select-input {
    height: 28px;
  }

  &.Select--single .Select-control .Select-value {
    line-height: 29px;
  }
`

const mapStateToProps = (state) => {
  return {
    selectStaveNotes: selectStaveNotes(state),
    question: state.documents.editing,
    selectedDescription: state.documents.selectedDescription,
    selectedClef: state.documents.selectedClef,
    selectedTimeSignature: state.documents.selectedTimeSignature,
    selectedKeySignature: state.documents.selectedKeySignature,
    selectedMeasures: state.documents.selectedMeasures,
    selectedValidators: state.documents.selectedValidators,
  }
}
const mapDispatchToProps = ({
  setSelectedDescription,
  setSelectedClef,
  setSelectedTimeSignature,
  setSelectedKeySignature,
  setSelectedMeasures,
  setSelectedValidators,
})
export default connect(mapStateToProps, mapDispatchToProps)(DocumentPageEditQuestion)
