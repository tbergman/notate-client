/* eslint-disable */

import Vex from 'vexflow';
import _ from 'lodash';

export default class ArtistAnnotation {
  constructor(artist, options) {
    this.artist = artist

    this.options = {
      font_face: "Arial",
      font_size: 10,
      font_style: null,
    }

    if (options != null) {
      _.extend(this.options, options)
    }

    this.reset()
  }

  reset() {
    this.customizations = {
      'font-size': this.options.font_size,
      'font-face': this.options.font_face,
      'font-style': this.options.font_style,
      'annotation-position': 'bottom',
    }
  }

  setOptions(options) {
    let validOptions = _.keys(this.customizations)

    for (let k in options) {
      let v = options[k]

      if (Array.from(validOptions).includes(k)) {
        this.customizations[k] = v
      }
    }
  }

  makeAnnotation(text) {
    let font_face = this.customizations['font-face']
    let font_size = this.customizations['font-size']
    let font_style = this.customizations['font-style']
    let aposition = this.customizations['annotation-position']

    let VJUST = Vex.Flow.Annotation.VerticalJustify;
    let default_vjust = (aposition === "top" ? VJUST.TOP : VJUST.BOTTOM)

    let makeIt = function(text, just) {
      if (just == null) {
        just = default_vjust
      }

      return new Vex.Flow.Annotation(text)
        .setFont(font_face, font_size, font_style)
        .setVerticalJustification(just)
    }

    let parts = text.match(/^\.([^-]*)-([^-]*)-([^.]*)\.(.*)/)

    if (parts != null) {
      font_face = parts[1]
      font_size = parts[2]
      font_style = parts[3]
      text = parts[4]
      return text ? makeIt(text) : null
    }

    parts = text.match(/^\.([^.]*)\.(.*)/)

    if (parts != null) {
      let just = default_vjust

      text = parts[2]

      switch (parts[1]) {
        case 'big': {
          font_style = 'bold';
          font_size = '14';
          break;
        }

        case 'italic':
        case 'italics': {
          font_face = 'Times';
          font_style = 'italic';
          break;
        }

        case 'medium': {
          font_size = '12';
          break;
        }

        case 'top': {
          just = VJUST.TOP;
          this.customizations['annotation-position'] = 'top';
          break;
        }

        case 'bottom': {
          just = VJUST.BOTTOM;
          this.customizations['annotation-position'] = 'bottom';
          break;
        }

        default: {
        }
      }
      return text ? makeIt(text, just) : null;
    }

    return makeIt(text);
  }

  addAnnotations(annotations) {
    const stave = _.last(this.artist.staves)
    const getScoreArticulationParts = text => text.match(/^\.(a[^\/]*)\/(t|b)[^.]*\./)

    let annotation, i, note, score_articulation
    let stave_notes = stave.note_notes

    // Add text annotations
    let iterable1 = stave_notes.slice(stave_notes.length - annotations.length)
    for (i = 0; i < iterable1.length; i++) {
      note = iterable1[i]
      if (!getScoreArticulationParts(annotations[i])) {
        annotation = this.makeAnnotation(annotations[i])
        if (annotation) {
          note.addAnnotation(0, this.makeAnnotation(annotations[i]))
        }
      }
    }

    // Add glyph articulations on score
    if (stave.note) {
      return (() => {
        let result = [];
        let iterable2 = stave_notes.slice(stave_notes.length - annotations.length);
        for (i = 0; i < iterable2.length; i++) {
          note = iterable2[i]
          let item

          score_articulation = this.makeScoreArticulation(annotations[i])

          if (score_articulation != null) {
            note.addArticulation(0, score_articulation)
          }

          result.push(item)
        }

        return result
      })();
    }
  }

  addTextVoice() {
    return _.last(this.artist.staves).text_voices.push([])
  }

  setTextFont(font) {
    if (font != null) {
      let parts = font.match(/([^-]*)-([^-]*)-([^.]*)/)

      if (parts != null) {
        this.customizations['font-face'] = parts[1]
        this.customizations['font-size'] = parseInt(parts[2], 10)
        return this.customizations['font-style'] = parts[3]
      }
    }
  }

  addTextNote(text, position = 0, smooth = true, ignoreTicks = false) {
    let voices = _.last(this.artist.staves).text_voices

    if (_.isEmpty(voices)) {
      throw new Vex.RERR('ArtistError', 'Can\'t add text note without text voice')
    }

    let font_face = this.customizations['font-face']
    let font_size = this.customizations['font-size']
    let font_style = this.customizations['font-style']

    let duration = ignoreTicks ? 'b' : this.artist.current_duration

    let struct = {
      text,
      duration,
      smooth,
      ignoreTicks,
      font: {
        family: font_face,
        size: font_size,
        weight: font_style
      }
    }

    if (text[0] === '#') {
      struct.glyph = text.slice(1)
    }

    let note = new Vex.Flow.TextNote(struct)
      .setLine(position)
      .setJustification(Vex.Flow.TextNote.Justification.CENTER)

    return _.last(voices).push(note)
  }

  makeScoreArticulation(text) {
    const articulationParts = text.match(/^\.(a[^\/]*)\/(t|b)[^.]*\./)

    if (articulationParts != null) {
      let type = articulationParts[1]
      let position = articulationParts[2]

      let POSTYPE = Vex.Flow.Modifier.Position
      let pos = position === "t" ? POSTYPE.ABOVE : POSTYPE.BELOW
      return new Vex.Flow.Articulation(type).setPosition(pos)
    } else {
      return null
    }
  }
};
