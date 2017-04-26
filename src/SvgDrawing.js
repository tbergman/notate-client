import Vex from 'vexflow';

export default class SvgDrawing {
  constructor(context) {
    this.context = context;
  }

  rect(x, y, width, height, attributes) {
    if (height < 0) {
      y += height;
      height *= -1;
    }

    const rectangle = this.context.create('rect');
    if (typeof attributes === 'undefined') {
      attributes = {
        fill: 'none',
        'stroke-width': this.lineWidth,
        stroke: 'black',
      };
    }

    Vex.Merge(attributes, {
      x,
      y,
      width,
      height,
    });

    this.context.applyAttributes(rectangle, attributes);

    this.context.add(rectangle);
    return rectangle;
  }
}
