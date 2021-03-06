// @flow

import { List } from 'immutable'
import reducer, { initialState } from './reducer'
import { DefaultQuestion, DefaultNote, DefaultDocument } from 'modules/types'
import { VALIDATE_PITCH_ONLY, VALIDATE_PITCH_DURATION } from 'modules/grading'
import { PITCH_EQUAL } from 'modules/grading'
import {
  SAVE_QUESTION,
  EDIT_QUESTION,
  NEW_QUESTION,
  REMOVE_QUESTION,
  SAVE_DOCUMENT,
  NEW_DOCUMENT,
  REMOVE_DOCUMENT,
  SET_SELECTED_DESCRIPTION,
  SET_SELECTED_CLEF,
  SET_SELECTED_TIME_SIGNATURE,
  SET_SELECTED_KEY_SIGNATURE,
  SET_SELECTED_MEASURES,
  SET_SELECTED_VALIDATORS,
} from 'modules/documents/actions'

describe('documents reducer', () => {
  it('should have default question editing state', () => {
    expect(initialState.selectedDescription).toEqual('')
    expect(initialState.selectedClef).toEqual('treble')
    expect(initialState.selectedKeySignature).toEqual('C')
    expect(initialState.selectedTimeSignature).toEqual('4/4')
    expect(initialState.selectedMeasures).toEqual(4)
    expect(initialState.selectedValidators).toEqual(VALIDATE_PITCH_DURATION)
  })

  it('saves a new question', () => {
    const newQuestion = {
      ...DefaultQuestion(),
      description: 'new description'
    }

    const result = reducer(initialState, { type: SAVE_QUESTION, payload: newQuestion })

    const newFoundQuestion = result.questions.find(x => x.id === newQuestion.id) || {}

    expect(newFoundQuestion.description).toEqual('new description')
  })

  it('sets each answers validators upon question save', () => {
    const question = {
      ...DefaultQuestion(),
      answerNotes: [{ ...DefaultNote, validators: [] }],
      validators: VALIDATE_PITCH_ONLY,
    }

    const result = reducer(initialState, { type: SAVE_QUESTION, payload: question })

    const newQuestion = result.questions.find(x => x.id === question.id) || {}

    expect(newQuestion.answerNotes[0].validators.length).toEqual(1)
    expect(newQuestion.answerNotes[0].validators[0]).toEqual(PITCH_EQUAL)
  })

  it('adds a new question', () => {
    const result = reducer(initialState, { type: NEW_QUESTION, payload: {} })

    const newQuestion = result.editing

    expect(newQuestion.description.length).toEqual(0)
    expect(newQuestion.answerNotes.length).toEqual(0)
    expect(newQuestion.questionNotes.length).toEqual(0)

    expect(newQuestion.id.length).toBeTruthy()
    expect(newQuestion.questionLayerId).toBeTruthy()
    expect(newQuestion.answerLayerId).toBeTruthy()
    expect(newQuestion.studentLayerId).toBeTruthy()

    expect(newQuestion.clef).toEqual('treble')
    expect(newQuestion.timeSignature).toEqual('4/4')
    expect(newQuestion.keySignature).toEqual('C')
  })

  it('adding a new question saves it immediately', () => {
    const result = reducer(initialState, { type: NEW_QUESTION, payload: {} })

    const newQuestion = result.editing

    expect(result.questions.size).toEqual(2)
    expect(result.questions.toJS()[1]).toEqual(newQuestion)
  })

  it('adding a new question sets its selected properties', () => {
    const result = reducer(initialState, { type: NEW_QUESTION, payload: {} })

    expect(result.selectedDescription).toEqual('')
    expect(result.selectedClef).toEqual('treble')
    expect(result.selectedKeySignature).toEqual('C')
    expect(result.selectedTimeSignature).toEqual('4/4')
    expect(result.selectedMeasures).toEqual(4)
    expect(result.selectedValidators).toEqual(VALIDATE_PITCH_DURATION)
  })

  it('removes a question', () => {
    const questionToRemove = { ...DefaultQuestion(), id: '1' }

    const state = {
      ...initialState,
      questions: initialState.questions.push(questionToRemove)
    }

    const result = reducer(state, { type: REMOVE_QUESTION, payload: questionToRemove.id })

    const deletedQuestion = result.questions.find(x => x.id === questionToRemove.id)

    expect(deletedQuestion).toBeUndefined()
  })

  it('should leave question being edited if diff than question being removed', () => {
    const questionToRemove = { ...DefaultQuestion(), id: '1' }
    const anotherQuestion = { ...DefaultQuestion(), id: '2' }

    const state = {
      ...initialState,
      questions: initialState.questions.push(questionToRemove).push(anotherQuestion),
      editing: anotherQuestion
    }

    const result = reducer(state, { type: REMOVE_QUESTION, payload: questionToRemove.id })

    expect(result.editing).toEqual(anotherQuestion)
  })

  it('should set next question as being edited if current one being removed', () => {
    const questionToRemove = { ...DefaultQuestion(), id: '1' }
    const anotherQuestion = { ...DefaultQuestion(), id: '2' }

    const state = {
      ...initialState,
      questions: List([questionToRemove, anotherQuestion]),
      editing: questionToRemove
    }

    const result = reducer(state, { type: REMOVE_QUESTION, payload: questionToRemove.id })

    expect(result.editing).toEqual(anotherQuestion)
  })

  it('selects a question for editing', () => {
    const questionToEdit = { ...DefaultQuestion(), id: '1' }

    const state = {
      ...initialState,
      questions: initialState.questions.push(questionToEdit)
    }

    const result = reducer(state, { type: EDIT_QUESTION, payload: questionToEdit.id })

    expect(result.editing).toEqual(questionToEdit)
  })

  it('edits an existing question', () => {
    const questionToEdit = { ...DefaultQuestion(), id: '1' }

    const state = {
      ...initialState,
      questions: initialState.questions.push(questionToEdit)
    }

    const result = reducer(state, { type: SAVE_QUESTION, payload: {
      ...questionToEdit,
      description: 'new description'
    }})

    const fetchedQuestion = result.questions.find(x => x.id === questionToEdit.id) || {}

    expect(fetchedQuestion.description).toEqual('new description')
  })

  it('editing a question sets its selected properties', () => {
    const questionToEdit = {
      ...DefaultQuestion(),
      id: '1',
      description: 'new description',
      clef: 'bass',
      keySignature: 'Am',
      timeSignature: '3/4',
      measures: 1,
      validators: VALIDATE_PITCH_ONLY,
    }

    const state = {
      ...initialState,
      questions: initialState.questions.push(questionToEdit)
    }

    const result = reducer(state, { type: EDIT_QUESTION, payload: questionToEdit.id })

    expect(result.selectedDescription).toEqual('new description')
    expect(result.selectedClef).toEqual('bass')
    expect(result.selectedKeySignature).toEqual('Am')
    expect(result.selectedTimeSignature).toEqual('3/4')
    expect(result.selectedMeasures).toEqual(1)
    expect(result.selectedValidators).toEqual(VALIDATE_PITCH_ONLY)
  })

  it('sets the selected description', () => {
    const result = reducer(initialState, { type: SET_SELECTED_DESCRIPTION, payload: 'new description' })

    expect(result.selectedDescription).toEqual('new description')
  })

  it('sets the selected clef', () => {
    const result = reducer(initialState, { type: SET_SELECTED_CLEF, payload: 'bass' })

    expect(result.selectedClef).toEqual('bass')
  })

  it('sets the selected time signature', () => {
    const result = reducer(initialState, { type: SET_SELECTED_TIME_SIGNATURE, payload: '3/4' })

    expect(result.selectedTimeSignature).toEqual('3/4')
  })

  it('sets the selected key signature', () => {
    const result = reducer(initialState, { type: SET_SELECTED_KEY_SIGNATURE, payload: 'Am' })

    expect(result.selectedKeySignature).toEqual('Am')
  })

  it('sets the selected measures', () => {
    const result = reducer(initialState, { type: SET_SELECTED_MEASURES, payload: 2 })

    expect(result.selectedMeasures).toEqual(2)
  })

  it('sets the selected validators', () => {
    const result = reducer(initialState, { type: SET_SELECTED_VALIDATORS, payload: VALIDATE_PITCH_ONLY })

    expect(result.selectedValidators).toEqual(VALIDATE_PITCH_ONLY)
  })

  it('saves a new document', () => {
    const newDocument = {
      ...DefaultDocument(),
      description: 'new description'
    }

    const result = reducer(initialState, { type: SAVE_DOCUMENT, payload: newDocument })

    const newFoundDocument = result.documents.find(x => x.id === newDocument.id) || {}

    expect(newFoundDocument.description).toEqual('new description')
  })

  it('edits an existing document', () => {
    const documentToEdit = { ...DefaultDocument(), id: '1' }

    const state = {
      ...initialState,
      documents: initialState.documents.push(documentToEdit)
    }

    const result = reducer(state, { type: SAVE_DOCUMENT, payload: {
      ...documentToEdit,
      description: 'new description'
    }})

    const fetchedDocument = result.documents.find(x => x.id === documentToEdit.id) || {}

    expect(fetchedDocument.description).toEqual('new description')
  })

  it('removes a document', () => {
    const documentToRemove = { ...DefaultDocument(), id: '1' }

    const state = {
      ...initialState,
      documents: initialState.documents.push(documentToRemove)
    }

    const result = reducer(state, { type: REMOVE_DOCUMENT, payload: documentToRemove.id })

    const deletedDocument = result.documents.find(x => x.id === documentToRemove.id)

    expect(deletedDocument).toBeUndefined()
  })

  it('adding a new question sets its selected properties', () => {
    const initialLength = initialState.documents.size

    const result = reducer(initialState, { type: NEW_DOCUMENT, payload: {} })

    const newLength = result.documents.size

    expect(newLength).toEqual(initialLength + 1)
  })
})
