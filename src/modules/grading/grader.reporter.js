// @flow

import _ from 'lodash'
import type { StaveNote, StaveAnswerNote } from 'modules/types'

type Result ={
  correct: boolean,
  incorrectAnswers: Array<StaveNote>,
  correctAnswers: Array<StaveNote>,
  emptyAnswers: Array<StaveNote>,
}

const Grader = {

    grade(answers: Array<StaveAnswerNote>, student: Array<StaveNote>): Result {
        var incorrectAnswers = [];
        var emptyAnswers = [];
        var correctAnswers = [];

        student.forEach(studentNote=>{
            const answerNote = _.find(answers, x => x.position === studentNote.position);
            if(!answerNote){
                console.log("Note found in a position with no answer.");
                incorrectAnswers.push(studentNote);
            }
            else if(_.every(answerNote.validators, x => x(answerNote)(studentNote))){
                correctAnswers.push(studentNote);
            }
            else {
                console.log("Wrong note at position:");
                console.log(studentNote.position);
                incorrectAnswers.push(studentNote);
            }
        });

        answers.forEach(answerNote=>{
            const studentNote = _.find(student, x => x.position === answerNote.position);
            if(!studentNote){
                console.log("No note found in answer position");
                console.log(answerNote.position);
                emptyAnswers.push(answerNote);
            }
        });

        console.log("The final grade is:");
        console.log(correctAnswers.length+"/"+answers.length);

        const result={
          correct: incorrectAnswers.length === 0 && emptyAnswers.length === 0,
          incorrectAnswers: incorrectAnswers,
          correctAnswers: correctAnswers,
          emptyAnswers: emptyAnswers,
        }

        return result;
    }
}

export default Grader
