import Vex from 'vexflow';
import { Flow } from 'vexflow';
var { GhostNote } = Flow;

import SvgDrawing from './SvgDrawing';

export default class SpaceHighlighting extends GhostNote {
  drawRect() {
    var rect = new SvgDrawing(this.context)
      .rect(this.tickContext.x, 40, 40, 60);

    rect.addEventListener("click", function(e) {
      console.log('clicked')
    })
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

    var group = this.context.openGroup('highlighting', this.getAttribute('id'));
    this.setAttribute('el', group);

    this.drawRect();
    // grect.mouseover(function(e) {
    //     rect.attr('fill', 'red');
    // }).mouseout(function(e) {
    //     rect.attr('fill', 'white');
    // }).mouseup(function(e) {
    //     alert("clicked");
    // });

    this.context.closeGroup();
    this.setRendered();
  }
}
