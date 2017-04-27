// @flow

import React, { Component } from 'react';
import TaskButtons from 'views/task_list/components/TaskButtons'
import TaskList from 'views/task_list/components/TaskList'

import logo from './logo.svg'
import './App.css'

import Vex from 'vexflow';
import SpaceHighlighting from './SpaceHighlighting';
import AnswerOptions from './AnswerOptions';

class App extends Component {
  componentDidMount() {
    var VF = Vex.Flow;

    // Create an SVG renderer and attach it to the DIV element named "boo".
    var div = document.getElementById("music")
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(500, 500);
    var context = renderer.getContext();
    var tickContext = new VF.TickContext();

    // Create a stave of width 10000 at position 10, 40 on the canvas.
    var stave = new VF.Stave(10, 10, 10000)
    .addClef('treble')

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    var question = [
      new VF.StaveNote({ keys: ['c/4'], stem_direction: 1, duration: '4' }),
      new VF.StaveNote({ keys: ['e/4'], stem_direction: 1, duration: '4' }),
    ];

    var answer = [
      new VF.StaveNote({ keys: ['a/4'], stem_direction: -1, duration: '4' }),
      new VF.StaveNote({ keys: ['g/4'], stem_direction: 1, duration: '4' }),
      new VF.GhostNote({ duration: '4' }),
    ];

    var highlight = [
      new SpaceHighlighting({ duration: '4' }),
      new SpaceHighlighting({ duration: '4' }),
      new SpaceHighlighting({ duration: '4' }),
      new SpaceHighlighting({ duration: '4' }),
      new AnswerOptions({ duration: '4' }),
      new AnswerOptions({ duration: '4' })
    ];

    // Connect it to the rendering context and draw!

    context.attributes.fill = null
    context.attributes.stroke = null

    tickContext.addTickable(question[0])
    tickContext.addTickable(question[1])
    tickContext.addTickable(answer[0])
    tickContext.addTickable(answer[1])
    tickContext.addTickable(highlight[0])
    tickContext.addTickable(highlight[1])
    tickContext.addTickable(highlight[2])
    tickContext.addTickable(highlight[3])
    tickContext.addTickable(highlight[4])
    tickContext.addTickable(highlight[5])
    question[0].setContext(context).setStave(stave)
    question[1].setContext(context).setStave(stave)
    answer[0].setContext(context).setStave(stave)
    answer[1].setContext(context).setStave(stave)



    highlight[0].setContext(context).setStave(stave)
    highlight[1].setContext(context).setStave(stave)
    highlight[2].setContext(context).setStave(stave)
    highlight[3].setContext(context).setStave(stave)
    highlight[4].setContext(context).setStave(stave)
    highlight[5].setContext(context).setStave(stave)

    const visibleNoteGroups = [];

    const questionLayer = context.openGroup();
    visibleNoteGroups.push(questionLayer);
    question[0].draw();
    tickContext.preFormat().setX(80);
    question[1].draw();
    context.closeGroup();
    questionLayer.classList.add('layer-question');

    const answerLayer = context.openGroup();
    visibleNoteGroups.push(answerLayer);
    tickContext.preFormat().setX(40);
    answer[0].draw();
    tickContext.preFormat().setX(120);
    answer[1].draw();
    context.closeGroup();
    answerLayer.classList.add('layer-answers');

    const highlightLayer = context.openGroup();
    visibleNoteGroups.push(highlightLayer);
    tickContext.preFormat().setX(40);
    highlight[0].draw();
    tickContext.preFormat().setX(80);
    highlight[1].draw();
    tickContext.preFormat().setX(120);
    highlight[2].draw();
    tickContext.preFormat().setX(160);
    highlight[3].draw();
    tickContext.preFormat().setX(200);
    highlight[4].draw();
    tickContext.preFormat().setX(240);
    highlight[5].draw();
    context.closeGroup();
    highlightLayer.classList.add('layer-highlight');

    highlight[4].remove();
  }

  render(): React.Element<any> {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div id="music"></div>
        <TaskButtons />
        <TaskList />
      </div>
    );
  }
}

export default App
