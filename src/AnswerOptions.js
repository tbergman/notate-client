import { Flow } from 'vexflow';
var { GhostNote } = Flow;

export default class AnswerOptions extends GhostNote {
  draw() {
    var group = this.context.openGroup('answer-options', this.getAttribute('id'));
    this.setAttribute('el', group);

    this.drawNote('g/3');
    this.drawNote('a/3');
    this.drawNote('b/3');
    this.drawNote('c/4');
    this.drawNote('d/4');
    this.drawNote('e/4');
    this.drawNote('f/4');
    this.drawNote('g/4');
    this.drawNote('a/4');
    this.drawNote('b/4');
    this.drawNote('c/5');
    this.drawNote('d/5');
    this.drawNote('e/5');
    this.drawNote('f/5');

    this.context.closeGroup();
    this.setRendered();
  }

  drawNote(pitch) {
    var note = new Flow.StaveNote({ keys: [pitch], stem_direction: 1, duration: '4' });
    this.tickContext.addTickable(note);
    note.setContext(this.context).setStave(this.getStave());

    const optionGroup = this.context.openGroup();
    console.log(optionGroup);
    note.draw();
    this.context.closeGroup();
    optionGroup.classList.add('option-question-tempo-4-duration-4-note-C');
    optionGroup.classList.add('option-question');
    optionGroup.addEventListener('click', () => { console.log('clicked on ', pitch) })
  }
}
