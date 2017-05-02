/* eslint-disable */

// Vex.Flow.VexTab
// Copyright 2012 Mohit Cheppudira <mohit@muthanna.com>
//
// This class implements the semantic analysis of the Jison
// output, and generates elements that can be used by
// Vex.Flow.Artist to render the notation.
// parsed by Vex.Flow.VexTab.

import Vex from 'vexflow';
import _ from 'lodash';
import parser from './parser.js';
import VexTabMods from './vextab.mods'

const L = function(...args) {
  if (VexTab.DEBUG) {
    return (typeof console !== 'undefined' && console !== null ? console.log("(Vex.Flow.VexTab)", ...Array.from(args)) : undefined);
  }
}

const newError = (object, msg) => new Vex.RERR("ParseError", `${msg} in line ${object._l} column ${object._c}`)

export default class VexTab extends VexTabMods {
  // Public methods
  constructor(artist) {
    super();
    this.DEBUG = false;
    this.artist = artist;
    this.reset();
  }

  reset() {
    this.valid = false;
    return this.elements = false;
  }

  isValid() { return this.valid; }

  getArtist() { return this.artist; }

  parseCommand(element) {
    if (element.command === "bar") {
      this.artist.addBar(element.type);
    }

    if (element.command === "tuplet") {
      this.artist.makeTuplets(element.params.tuplet, element.params.notes);
    }

    if (element.command === "annotations") {
      this.artist.addAnnotations(element.params);
    }

    if (element.command === "rest") {
      this.artist.addRest(element.params);
    }

    if (element.command === "command") {
      return this.artist.runCommand(element.params, element._l, element._c);
    }
  }

  parseChord(element) {
    L("parseChord:", element);
    return this.artist.addChord(
      _.map(element.chord,
            note=> _.pick(note, 'time', 'dot', 'fret', 'abc', 'octave', 'string', 'articulation', 'decorator')),
      element.articulation, element.decorator);
  }

  parseFret(note) {
    return this.artist.addNote(_.pick(
      note, 'time', 'dot', 'fret', 'string', 'articulation', 'decorator'));
  }

  parseABC(note) {
    return this.artist.addNote(_.pick(
      note, 'time', 'dot', 'fret', 'abc', 'octave', 'string', 'articulation', 'decorator'));
  }

  parseStaveElements(notes) {
    L("parseStaveElements:", notes);
    return (() => {
      let result = [];
      for (let element of Array.from(notes)) {
        let item;
        if (element.time) {
          this.artist.setDuration(element.time, element.dot);
        }

        if (element.command) {
          this.parseCommand(element);
        }

        if (element.chord) {
          this.parseChord(element);
        }

        if (element.abc) {
          item = this.parseABC(element);
        } else if (element.fret) {
          item = this.parseFret(element);
        }
        result.push(item);
      }
      return result;
    })();
  }

  parseStaveText(text_line) {
    if (!_.isEmpty(text_line)) { this.artist.addTextVoice(); }

    let position = 0;
    let justification = "center";
    let smooth = true;
    let font = null;

    let bartext = () => this.artist.addTextNote("", 0, justification, false, true);
    let createNote = text => {
      let ignore_ticks = false;
      if (text[0] === "|") {
        ignore_ticks = true;
        text = text.slice(1);
      }

      try {
        return this.artist.addTextNote(text, position, justification, smooth, ignore_ticks);
      } catch (e) {
        throw newError(`Bad text or duration. Did you forget a comma?${e}`);
      }
    };

    return (() => {
      let result = [];
      for (let str of Array.from(text_line)) {
        let text = str.text.trim();
        if (text.match(/\.font=.*/)) {
          font = text.slice(6);
          result.push(this.artist.setTextFont(font));
        } else if (text[0] === ":") {
          result.push(this.artist.setDuration(text));
        } else if (text[0] === ".") {
          let command = text.slice(1);
          switch (command) {
            case "center": case "left": case "right":
              result.push(justification = command);
              break;
            case "strict":
              result.push(smooth = false);
              break;
            case "smooth":
              result.push(smooth = true);
              break;
            case "bar": case "|":
              result.push(bartext());
              break;
            default:
              result.push(position = parseInt(text.slice(1), 10));
          }
        } else if (text === "|") {
          result.push(bartext());
        } else if (text.slice(0, 2) === "++") {
          result.push(this.artist.addTextVoice());
        } else {
          result.push(createNote(text));
        }
      }
      return result;
    })();
  }

  generate() {
    return Array.from(this.elements).map((stave) =>
      (() => { switch (stave.element) {
        case "stave":
        case "tabstave":
          this.artist.addStave(stave.element, this.parseStaveOptions(stave.options));
          if (stave.notes != null) { this.parseStaveElements(stave.notes); }
          if (stave.text != null) { return this.parseStaveText(stave.text); }
          break;
        case "voice":
          this.artist.addVoice(this.parseStaveOptions(stave.options));
          if (stave.notes != null) { this.parseStaveElements(stave.notes); }
          if (stave.text != null) { return this.parseStaveText(stave.text); }
          break;
        case "options":
          let options = {};
          for (let option of Array.from(stave.params)) {
            options[option.key] = option.value;
          }
          try {
            return this.artist.setOptions(options);
          } catch (e) {
            throw newError(stave, e.message);
          }
        default:
          throw newError(stave, `Invalid keyword '${stave.element}'`);
      } })());
  }

  parse(code) {
    parser.parseError = function(message, hash) {
      L("VexTab parse error: ", message, hash);
      message = `Unexpected text '${hash.text}' at line ${hash.loc.first_line} column ${hash.loc.first_column}.`;
      throw new Vex.RERR("ParseError", message);
    };

    if (code == null) { throw new Vex.RERR("ParseError", "No code"); }

    L(`Parsing:\n${code}`);

    // Strip lines
    let stripped_code = (Array.from(code.split(/\r\n|\r|\n/)).map((line) => line.trim()));
    this.elements = parser.parse(stripped_code.join("\n"));
    if (this.elements) {
      this.generate();
      this.valid = true;
    }

    console.log(this.elements)
    return this.elements;
  }
};
