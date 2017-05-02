/* eslint-disable */

// Vex.Flow.VexTab
// Copyright 2012 Mohit Cheppudira <mohit@muthanna.com>
//
// This class implements the semantic analysis of the Jison
// output, and generates elements that can be used by
// Vex.Flow.Artist to render the notation.
// parsed by Vex.Flow.VexTab.

import Vex from 'vexflow'
import _ from 'lodash'
import parser from './parser.js'

import VexTabMods from './vextab.mods'

const newError = (object, msg) => new Vex.RERR("ParseError", `${msg} in line ${object._l} column ${object._c}`)

export default class VexTab extends VexTabMods {
  // Public methods
  constructor(artist) {
    super()
    this.DEBUG = false
    this.artist = artist
    this.reset()
  }

  reset() {
    this.valid = false
    return this.elements = false
  }

  isValid() { return this.valid }

  getArtist() { return this.artist }

  parseCommand(element) {
    if (element.command === "bar") {
      this.artist.addBar(element.type)
    }

    if (element.command === "tuplet") {
      this.artist.tuplets.makeTuplets(element.params.tuplet, element.params.notes)
    }

    if (element.command === "annotations") {
      this.artist.annotations.addAnnotations(element.params)
    }

    if (element.command === "rest") {
      this.artist.addRest(element.params)
    }

    if (element.command === "command") {
      return this.artist.runCommand(element.params, element._l, element._c)
    }
  }

  parseChord(element) {
    return this.artist.addChord(
      _.map(element.chord,
        note => _.pick(note, 'time', 'dot', 'fret', 'abc', 'octave', 'string', 'articulation', 'decorator')
      ),
      element.articulation, element.decorator)
  }

  parseFret(note) {
    const parsedNote = _.pick(note,
      'time',
      'dot',
      'fret',
      'string',
      'articulation',
      'decorator'
    )

    return this.artist.addNote()
  }

  parseABC(note) {
    const parsedNote = _.pick(note,
      'time',
      'dot',
      'fret',
      'abc',
      'octave',
      'string',
      'articulation',
      'decorator'
    )

    return this.artist.addNote(parsedNote)
  }

  parseStaveElements(notes) {
    return (() => {
      let result = []

      for (let element of Array.from(notes)) {
        let item;
        if (element.time) {
          this.artist.setDuration(element.time, element.dot)
        }

        if (element.command) {
          this.parseCommand(element)
        }

        if (element.chord) {
          this.parseChord(element)
        }

        if (element.abc) {
          item = this.parseABC(element)
        } else if (element.fret) {
          item = this.parseFret(element)
        }

        result.push(item)
      }

      return result
    })();
  }

  generate() {
    return Array.from(this.elements).map((stave) =>
      (() => { switch (stave.element) {
        case "stave":
        case "tabstave": {
          this.artist.addStave(stave.element, this.parseStaveOptions(stave.options))

          if (stave.notes != null) {
            this.parseStaveElements(stave.notes)
          }

          if (stave.text != null) {
            return this.parseStaveText(stave.text)
          }

          break
        }

        case "voice": {
          this.artist.addVoice(this.parseStaveOptions(stave.options))

          if (stave.notes != null) {
            this.parseStaveElements(stave.notes)
          }

          if (stave.text != null) {
            return this.parseStaveText(stave.text)
          }
          break
        }

        case "options": {
          let options = {}
          for (let option of Array.from(stave.params)) {
            options[option.key] = option.value
          }

          try {
            return this.artist.setOptions(options)
          } catch (e) {
            throw newError(stave, e.message)
          }
        }

        default: {
          throw newError(stave, `Invalid keyword '${stave.element}'`)
        }
      } })())
  }

  parse(code) {
    parser.parseError = function(message, hash) {
      message = `Unexpected text '${hash.text}' at line ${hash.loc.first_line} column ${hash.loc.first_column}.`
      throw new Vex.RERR("ParseError", message)
    }

    if (code == null) {
      throw new Vex.RERR("ParseError", "No code")
    }

    let strippedCode = (Array.from(code.split(/\r\n|\r|\n/)).map((line) => line.trim()))
    this.elements = parser.parse(strippedCode.join("\n"))

    if (this.elements) {
      this.generate()
      this.valid = true
    }

    return this.elements
  }
}
