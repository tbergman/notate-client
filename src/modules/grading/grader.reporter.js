// @flow

import _ from 'lodash'
import type { StaveNote, StaveAnswerNote } from 'modules/types'

const Grader = {
    grade(answers: Array<StaveAnswerNote>, student: Array<StaveNote>): boolean {
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

        return incorrectAnswers.length === 0 && emptyAnswers.length === 0
    }
}

export default Grader
