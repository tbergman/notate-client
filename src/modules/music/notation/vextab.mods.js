/* eslint-disable */

import Vex from 'vexflow'
import _ from 'lodash'
import parser from './parser.js'

const newError = (object, msg) => new Vex.RERR("ParseError", `${msg} in line ${object._l} column ${object._c}`)

export default class VexTabMods {

  parseStaveOptions(options) {
    let params = {}
    if (options == null) {
      return params
    }

    let notationOption = null;
    for (var option of Array.from(options)) {
      let e;
      let error = msg => newError(option, msg);

      params[option.key] = option.value;

      switch (option.key) {
        case 'notation':
        case 'tablature': {
          notationOption = option;
          if (!['true', 'false'].includes(option.value)) { throw error(`'${option.key}' must be 'true' or 'false'`); }
          break;
        }

        case 'key': {
          if (!_.has(Vex.Flow.keySignature.keySpecs, option.value)) {
            throw error(`Invalid key signature '${option.value}'`);
          }
          break;
        }

        case 'clef': {
          let clefs = ['treble', 'bass', 'tenor', 'alto', 'percussion', 'none'];
          if (!Array.from(clefs).includes(option.value)) {
            throw error(`'clef' must be one of ${clefs.join(', ')}`);
          }
          break;
        }

        case 'voice': {
          let voices = ['top', 'bottom', 'new'];
          if (!Array.from(voices).includes(option.value)) {
            throw error(`'voice' must be one of ${voices.join(', ')}`);
          }
          break;
        }

        case 'time': {
          try {
            new Vex.Flow.TimeSignature(option.value);
          } catch (error1) {
            e = error1;
            throw error(`Invalid time signature: '${option.value}'`);
          }
          break;
        }

        case 'tuning':
          try {
            new Vex.Flow.Tuning(option.value);
          } catch (error2) {
            e = error2;
            throw error(`Invalid tuning: '${option.value}'`);
          }
          break;

        case 'strings': {
          let num_strings = parseInt(option.value);
          if ((num_strings < 4) || (num_strings > 8)) { throw error(`Invalid number of strings: ${num_strings}`); }
          break;
        }

        default: {
          throw error(`Invalid option '${option.key}'`);
        }
      }
    }

    if ((params.notation === 'false') && (params.tablature === 'false')) {
      throw newError(notationOption, 'Both "notation" and "tablature" can\'t be invisible');
    }

    return params;
  }

  parseStaveText(textLine) {
    if (!_.isEmpty(textLine)) {
      this.artist.annotations.addTextVoice()
    }

    let position = 0
    let justification = 'center'
    let smooth = true
    let font = null

    let bartext = () => this.artist.annotations.addTextNote('', 0, justification, false, true)

    let createNote = text => {
      let ignoreTicks = false
      if (text[0] === '|') {
        ignoreTicks = true
        text = text.slice(1)
      }

      try {
        return this.artist.annotations.addTextNote(text, position, justification, smooth, ignoreTicks)
      } catch (e) {
        throw newError(`Bad text or duration. Did you forget a comma?${e}`)
      }
    }

    return (() => {
      let result = []

      for (let str of Array.from(textLine)) {
        let text = str.text.trim()

        if (text.match(/\.font=.*/)) {
          font = text.slice(6)
          result.push(this.artist.annotations.setTextFont(font))
        } else if (text[0] === ':') {
          result.push(this.artist.setDuration(text))
        } else if (text[0] === '.') {
          let command = text.slice(1)

          switch (command) {
            case 'center':
            case 'left':
            case 'right': {
              result.push(justification = command)
              break
            }

            case 'strict': {
              result.push(smooth = false)
              break
            }

            case 'smooth': {
              result.push(smooth = true)
              break
            }

            case 'bar':
            case '|': {
              result.push(bartext())
              break
            }

            default: {
              result.push(position = parseInt(text.slice(1), 10))
            }
          }
        } else if (text === '|') {
          result.push(bartext())
        } else if (text.slice(0, 2) === '++') {
          result.push(this.artist.annotations.addTextVoice())
        } else {
          result.push(createNote(text))
        }
      }
      return result
    })();
  }
};
