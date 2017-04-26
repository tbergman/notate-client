import Vex from 'vexflow';
import { Flow } from 'vexflow';
var {
  GhostNote
} = Flow;

console.log(Vex);
console.log(Flow);

// [VexFlow](http://vexflow.com) - Copyright (c) Mohit Muthanna 2010.
//
// ## Description

export default class SpaceHighlighting extends GhostNote {
  isRest() { return true; }

  drawRect() {
    console.log(this);
    var rect = this.context.rect(this.tickContext.x, 40, 40, 60);
    this.context.stroke('red')

  }

  draw() {
    if (!this.context) {
      throw new Vex.RERR('NoCanvasContext', "Can't draw without a canvas context.");
    }
    if (!this.stave) {
      throw new Vex.RERR('NoStave', "Can't draw without a stave.");
    }
    if (this.ys.length === 0) {
      throw new Vex.RERR('NoYValues', "Can't draw note without Y values.");
    }

    this.setAttribute('el', this.context.openGroup('highlighting', this.getAttribute('id')));
    this.drawRect();
    this.context.closeGroup();
    this.setRendered();

    console.log('draw')
  }
}
