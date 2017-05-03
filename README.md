This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Then, the following were added:
* redux
* react-redux
* redux-promise

Project folder organization follows a pattern described at [https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e#.p35q8cgdh]

[SETUP]
`yarn install`
(if you don't have yarn, `brew install yarn`)

to enable a pre commit hook to run on your your local environment:
`cp ./pre-commit .git/hooks/pre-commit`
`chmod +x .git/hooks/pre-commit`

[DESIGN PARAMETERS]
[[Note Positioning]]
Horizontal note positioning should be done with flex layout. Each child of the flex container should express a duration in some smallest desired quantization (e.g. somewhere from quarter notes to 128th notes), though barlines should be flexible enough to adapt for measures with too many notes (a potential, and allowable, wrong measure).


##Project Overview
_Notate!_ is, in this first iteration, an application that allows notation-based
music fundamentals questions to be designed by an instructor, answered by a student,
and automatically graded by the built-in computational system.

To achieve this goal, the project can be conceived as a series of small milestones:
1. Display notation from Redux state
2. Interact with the staff to add notes
3. Interact with a _question_, where multiple streams to exist on the same staff: A question, an "provided answer",
   and an interactive "student answer" layer
4. Compare a "provided answer" with a "student answer" and provide feedback
5. Build an interface that allows a question/provided-answer pair to be created and saved.
   (NOTE: "saving" does not, in this POC, require a backend. We may simply output a JSON blob
   that can be pasted at the top of an HTML page.)
6. Create an assignment with multiple questions

###Notation display
Let's first talk about the representation of notation in this application.
We are following many principles of the Humdrum _**kern_ representation.
Of particular relevance are the representation of
- [pitch (3.2.1)](http://www.music-cog.ohio-state.edu/Humdrum/representations/kern.html#Pitch)
- [duration (3.2.7)](http://www.music-cog.ohio-state.edu/Humdrum/representations/kern.html#Duration)
- [rests (3.3)](http://www.music-cog.ohio-state.edu/Humdrum/representations/kern.html#Rests)
- [multiple stops (3.12)](http://www.music-cog.ohio-state.edu/Humdrum/representations/kern.html#Multiple%20Stops)
- [spines (all of 3.2)](http://www.music-cog.ohio-state.edu/Humdrum/representations/kern.html#Humdrum)

Consider our simplest MVP scenario: a page displays a single notation-based question by showing
a measure with a whole note G4. The user is asked to add another note a major third above the given note.

- At the top of the hierarchy encapsulating this question is the `Question` object.
- Each `Question` may contain `Music`
- `Music` must contain a `Staff`, and one or more `Layer`s
- `Layer`s are an abstraction that encapsulate things like "provided answer," "student answer," and "question,"
  and may contain one or more `Spine`s
- Somehow, we divide the `Spine` into `Measure`s
- A `Spine`, on a per-`Measure` basis, determines the horizontal positioning of notes using flexbox
- A multiple-stop in a `Spine` (which we can call a chord), determines the vertical positioning of notes using flexbox
- In any measure that's part of a question, there will be extra space at the end of the measure to add more notes,
  and, in this POC, we will not enforce a given time-signature, in order to allow students to enter _incorrect_ answers

_Achieving Task #1_
Build an appropriate Redux representation of a notation state. `initialState` can include
a representative `Question`, and a few buttons on the page can switch the notes in the state.
Interactivity should be minimal, and our goal is to display
notes well, with a properly designed and tested React component

_Achieving Task #2_
First we want to add Quarter Notes to the given Layer by clicking on the staff.
Then we want to select and add notes of different duration.
For now, one layer has one spine, so notes of different duration cannot be stacked
