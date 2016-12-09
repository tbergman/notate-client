This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Then, the following were added:
* redux
* react-redux
* redux-promise

Project folder organization follows a pattern described at [https://medium.com/lexical-labs-engineering/redux-best-practices-64d59775802e#.p35q8cgdh]

[SETUP]
`yarn install`
(if you don't have yarn, `brew install yarn`)

[DESIGN PARAMETERS]
[[Note Positioning]]
Horizontal note positioning should be done with flex layout. Each child of the flex container should express a duration in some smallest desired quantization (e.g. somewhere from quarter notes to 128th notes), though barlines should be flexible enough to adapt for measures with too many notes (a potential, and allowable, wrong measure).
