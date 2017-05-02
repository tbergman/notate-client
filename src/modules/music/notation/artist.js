/* eslint-disable */

// VexTab Artist
// Copyright 2012 Mohit Cheppudira <mohit@muthanna.com>
//
// This class is responsible for rendering the elements
// parsed by Vex.Flow.VexTab.

import Vex from 'vexflow';
import _ from 'lodash';

import ArtistAnnotations from './artist.annotations'
import ArtistTuplets from './artist.tuplets'

let parseBool = str => str === "true";
let makeDuration = (time, dot) => time + (dot ? "d" : "")
let getScoreArticulationParts = text => text.match(/^\.(a[^\/]*)\/(t|b)[^.]*\./)

const __guard__ = (value, transform) => {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined;
}

export default class Artist {
  constructor(x, y, width, options) {
    this.x = x
    this.y = y
    this.width = width

    this.options = {
      font_face: "Arial",
      font_size: 10,
      font_style: null,
      bottom_spacing: 20,
      tab_stave_lower_spacing: 10,
      note_stave_lower_spacing: 0,
      scale: 1.0
    }

    if (options != null) {
      _.extend(this.options, options)
    }

    this.annotations = new ArtistAnnotations(this, this.options)
    this.tuplets = new ArtistTuplets(this)

    this.reset()
  }

  formatAndRender(ctx, tab, score, text_notes, customizations, options) {
    let i, multi_voice, notes, score_stave, tab_stave, voice;
    if (tab != null) { tab_stave = tab.stave; }
    if (score != null) { score_stave = score.stave; }

    let tab_voices = [];
    let score_voices = [];
    let text_voices = [];
    let beams = [];
    let format_stave = null;
    let text_stave = null;

    let beam_config = {
      beam_rests: parseBool(customizations["beam-rests"]),
      show_stemlets: parseBool(customizations["beam-stemlets"]),
      beam_middle_only: parseBool(customizations["beam-middle-only"]),
      groups: options.beam_groups
    };

    if (tab != null) {
      multi_voice = (tab.voices.length > 1) ? true : false;
      for (i = 0; i < tab.voices.length; i++) {
        notes = tab.voices[i];
        if (_.isEmpty(notes)) { continue; }
        _.each(notes, note => note.setStave(tab_stave));
        voice = new Vex.Flow.Voice(Vex.Flow.TIME4_4).
          setMode(Vex.Flow.Voice.Mode.SOFT);
        voice.addTickables(notes);
        tab_voices.push(voice);

        if (customizations["tab-stems"] === "true") {
          if (multi_voice) {
            beam_config.stem_direction = i === 0 ? 1 : -1;
          } else {
            beam_config.stem_direction = customizations["tab-stem-direction"] === "down" ? -1 : 1;
          }

          beam_config.beam_rests = false;
          beams = beams.concat(Vex.Flow.Beam.generateBeams(voice.getTickables(), beam_config));
        }
      }

      format_stave = tab_stave;
      text_stave = tab_stave;
    }

    beam_config.beam_rests = parseBool(customizations["beam-rests"]);

    if (score != null) {
      multi_voice = (score.voices.length > 1) ? true : false;
      for (i = 0; i < score.voices.length; i++) {
        notes = score.voices[i];
        if (_.isEmpty(notes)) { continue; }
        let stem_direction = i === 0 ? 1 : -1;
        _.each(notes, note => note.setStave(score_stave));

        voice = new Vex.Flow.Voice(Vex.Flow.TIME4_4).
          setMode(Vex.Flow.Voice.Mode.SOFT);
        voice.addTickables(notes);
        score_voices.push(voice);
        if (multi_voice) {
          beam_config.stem_direction = stem_direction;
          beams = beams.concat(Vex.Flow.Beam.generateBeams(notes, beam_config));
        } else {
          beam_config.stem_direction = null;
          beams = beams.concat(Vex.Flow.Beam.generateBeams(notes, beam_config));
        }
      }

      format_stave = score_stave;
      text_stave = score_stave;
    }

    for (notes of Array.from(text_notes)) {
      if (_.isEmpty(notes)) { continue; }
      _.each(notes, voice => voice.setStave(text_stave));
      voice = new Vex.Flow.Voice(Vex.Flow.TIME4_4).
          setMode(Vex.Flow.Voice.Mode.SOFT);
      voice.addTickables(notes);
      text_voices.push(voice);
    }

    if (format_stave != null) {
      let format_voices = [];
      let formatter = new Vex.Flow.Formatter();
      let align_rests = false;

      if (tab != null) {
        if (!_.isEmpty(tab_voices)) { formatter.joinVoices(tab_voices); }
        format_voices = tab_voices;
      }

      if (score != null) {
        if (!_.isEmpty(score_voices)) { formatter.joinVoices(score_voices); }
        format_voices = format_voices.concat(score_voices);
        if (score_voices.length > 1) { align_rests = true; }
      }

      if (!_.isEmpty(text_notes) && !_.isEmpty(text_voices)) {
        formatter.joinVoices(text_voices);
        format_voices = format_voices.concat(text_voices);
      }

      if (!_.isEmpty(format_voices)) { formatter.formatToStave(format_voices, format_stave, {align_rests}); }

      if (tab != null) { _.each(tab_voices, voice => voice.draw(ctx, tab_stave)); }
      if (score != null) { _.each(score_voices, voice => voice.draw(ctx, score_stave)); }
      _.each(beams, beam => beam.setContext(ctx).draw());
      if (!_.isEmpty(text_notes)) { _.each(text_voices, voice => voice.draw(ctx, text_stave)); }

      if ((tab != null) && (score != null)) {
        (new Vex.Flow.StaveConnector(score.stave, tab.stave))
          .setType(Vex.Flow.StaveConnector.type.BRACKET)
          .setContext(ctx).draw();
      }

      if (score != null) { return score_voices; } else { return tab_voices; }
    }
  }

  reset() {
    this.tuning = new Vex.Flow.Tuning();
    this.key_manager = new Vex.Flow.KeyManager("C");
    this.music_api = new Vex.Flow.Music();

    // User customizations
    this.customizations = {
      "font-size": this.options.font_size,
      "font-face": this.options.font_face,
      "font-style": this.options.font_style,
      "annotation-position": "bottom",
      "scale": this.options.scale,
      "width": this.width,
      "stave-distance": 0,
      "space": 0,
      "player": "false",
      "tempo": 120,
      "instrument": "acoustic_grand_piano",
      "accidentals": "standard",  // standard / cautionary
      "tab-stems": "false",
      "tab-stem-direction": "up",
      "beam-rests": "true",
      "beam-stemlets": "true",
      "beam-middle-only": "false",
      "connector-space": 5
    };

    // Generated elements
    this.staves = [];
    this.tab_articulations = [];
    this.stave_articulations = [];

    // Voices for player
    this.player_voices = [];

    // Current state
    this.last_y = this.y;
    this.current_duration = "q";
    this.current_clef = "treble";
    this.current_bends = {};
    this.current_octave_shift = 0;
    this.bend_start_index = null;
    this.bend_start_strings = null;
    this.rendered = false;
    return this.renderer_context = null;
  }

  attachPlayer(player) {
    return this.player = player;
  }

  setOptions(options) {
    this.annotations.setOptions(options)

    let valid_options = _.keys(this.customizations);
    for (let k in options) {
      let v = options[k]
      if (Array.from(valid_options).includes(k)) {
        this.customizations[k] = v
      } else {
        throw new Vex.RERR("ArtistError", `Invalid option '${k}'`);
      }
    }

    this.last_y += parseInt(this.customizations.space, 10)

    if (this.customizations.player === "true") {
      return this.last_y += 15
    }
  }

  getPlayerData() {
    return {
      voices: this.player_voices,
      context: this.renderer_context,
      scale: this.customizations.scale
    };
  }

  render(renderer) {
    renderer.resize(this.customizations.width * this.customizations.scale,
        (this.last_y + this.options.bottom_spacing) * this.customizations.scale);
    let ctx = renderer.getContext();
    ctx.scale(this.customizations.scale, this.customizations.scale);
    ctx.clear();
    ctx.setFont(this.options.font_face, this.options.font_size, "");

    this.renderer_context = ctx;

    let setBar = function(stave, notes) {
      let last_note = _.last(notes);
      if (last_note instanceof Vex.Flow.BarNote) {
        notes.pop();
        return stave.setEndBarType(last_note.getType());
      }
    };

    for (let stave of Array.from(this.staves)) {
      // If the last note is a bar, then remove it and render it as a stave modifier.
      if (stave.tab != null) { setBar(stave.tab, stave.tab_notes); }
      if (stave.note != null) { setBar(stave.note, stave.note_notes); }

      if (stave.tab != null) { stave.tab.setContext(ctx).draw(); }
      if (stave.note != null) { stave.note.setContext(ctx).draw(); }

      stave.tab_voices.push(stave.tab_notes);
      stave.note_voices.push(stave.note_notes);

      let voices = this.formatAndRender(ctx,
                      (stave.tab != null) ? {stave: stave.tab, voices: stave.tab_voices} : null,
                      (stave.note != null) ? {stave: stave.note, voices: stave.note_voices} : null,
                      stave.text_voices,
                      this.customizations,
                      {beam_groups: stave.beam_groups});

      this.player_voices.push(voices);
    }

    for (var articulation of Array.from(this.tab_articulations)) {
      articulation.setContext(ctx).draw();
    }

    for (articulation of Array.from(this.stave_articulations)) {
      articulation.setContext(ctx).draw();
    }

    if (this.player != null) {
      if (this.customizations.player === "true") {
        this.player.setTempo(parseInt(this.customizations.tempo, 10));
        this.player.setInstrument(this.customizations.instrument);
        this.player.render();
      } else {
        this.player.removeControls();
      }
    }
    this.rendered = true;
  }

  isRendered() { return this.rendered; }

  draw(renderer) { return this.render(renderer); }

  // Given a fret/string pair, returns a note, octave, and required accidentals
  // based on current guitar tuning and stave key. The accidentals may be different
  // for repeats of the same notes because they get set (or cancelled) by the Key
  // Manager.
  getNoteForFret(fret, string) {
    let spec = this.tuning.getNoteForFret(fret, string);
    let spec_props = Vex.Flow.keyProperties(spec);

    let selected_note = this.key_manager.selectNote(spec_props.key);
    let accidental = null;

    // Do we need to specify an explicit accidental?
    switch (this.customizations.accidentals) {
      case "standard":
        if (selected_note.change) {
          accidental = (selected_note.accidental != null) ? selected_note.accidental : "n";
        }
        break;
      case "cautionary":
        if (selected_note.change) {
          accidental = (selected_note.accidental != null) ? selected_note.accidental : "n";
        } else {
          accidental = (selected_note.accidental != null) ? selected_note.accidental + "_c" : undefined;
        }
        break;
      default:
        throw new Vex.RERR("ArtistError", `Invalid value for option 'accidentals': ${this.customizations.accidentals}`);
    }

    let new_note = selected_note.note;
    let new_octave = spec_props.octave;

    // TODO(0xfe): This logic should probably be in the KeyManager code
    let old_root = this.music_api.getNoteParts(spec_props.key).root;
    let new_root = this.music_api.getNoteParts(selected_note.note).root;

    // Figure out if there's an octave shift based on what the Key
    // Manager just told us about the note.
    if ((new_root === "b") && (old_root === "c")) {
      new_octave--;
    } else if ((new_root === "c") && (old_root === "b")) {
      new_octave++;
    }

    return [new_note, new_octave, accidental];
  }

  getNoteForABC(abc, string) {
    let { key } = abc;
    let octave = string;
    let { accidental } = abc;
    if (abc.accidental_type != null) { accidental += `_${abc.accidental_type}`; }
    return [key, octave, accidental];
  }

  addStaveNote(note_params) {
    let params = {
      is_rest: false,
      play_note: null
    };

    _.extend(params, note_params);

    let stave_notes = _.last(this.staves).note_notes;
    let stave_note = new Vex.Flow.StaveNote({
      keys: params.spec,
      duration: this.current_duration + (params.is_rest ? "r" : ""),
      clef: params.is_rest ? "treble" : this.current_clef,
      auto_stem: params.is_rest ? false : true
    });

    for (let index = 0; index < params.accidentals.length; index++) {
      let acc = params.accidentals[index];
      if (acc != null) {
        let parts = acc.split("_");
        let new_accidental = new Vex.Flow.Accidental(parts[0]);

        if ((parts.length > 1) && (parts[1] === "c")) {
          new_accidental.setAsCautionary();
        }

        stave_note.addAccidental(index, new_accidental);
      }
    }

    if (this.current_duration[this.current_duration.length - 1] === "d") {
      stave_note.addDotToAll();
    }

    if (params.play_note != null) { stave_note.setPlayNote(params.play_note); }
    return stave_notes.push(stave_note);
  }

  addTabNote(spec, play_note) {
    if (play_note == null) { play_note = null; }
    let { tab_notes } = _.last(this.staves);
    let new_tab_note = new Vex.Flow.TabNote({
      positions: spec,
      duration: this.current_duration
      }, (this.customizations["tab-stems"] === "true")
    );
    if (play_note != null) { new_tab_note.setPlayNote(play_note); }
    tab_notes.push(new_tab_note);

    if (this.current_duration[this.current_duration.length - 1] === "d") {
      return new_tab_note.addDot();
    }
  }

  setDuration(time, dot) {
    if (dot == null) {
      dot = false
    }

    const t = time.split(/\s+/)

    return this.current_duration = makeDuration(t[0], dot)
  }

  addBar(type) {
    this.key_manager.reset();
    let stave = _.last(this.staves);

    let TYPE = Vex.Flow.Barline.type;
    type = (() => { switch (type) {
      case "single":
        return TYPE.SINGLE;
      case "double":
        return TYPE.DOUBLE;
      case "end":
        return TYPE.END;
      case "repeat-begin":
        return TYPE.REPEAT_BEGIN;
      case "repeat-end":
        return TYPE.REPEAT_END;
      case "repeat-both":
        return TYPE.REPEAT_BOTH;
      default:
        return TYPE.SINGLE;
    } })();

    let bar_note = new Vex.Flow.BarNote().setType(type);
    stave.tab_notes.push(bar_note);
    if (stave.note != null) { return stave.note_notes.push(bar_note); }
  }

  makeScoreArticulation(text) {
    let parts = getScoreArticulationParts(text);
    if (parts != null) {
      let type = parts[1];
      let position = parts[2];

      let POSTYPE = Vex.Flow.Modifier.Position;
      let pos = position === "t" ? POSTYPE.ABOVE : POSTYPE.BELOW;
      return new Vex.Flow.Articulation(type).setPosition(pos);
    } else { return null; }
  }

  addStaveArticulation(type, first_note, last_note, first_indices, last_indices) {
    let articulation = null

    if (["b", "s", "h", "p", "t", "T"].includes(type)) {
      articulation = new Vex.Flow.StaveTie({
        first_note,
        last_note,
        first_indices,
        last_indices,
      })
    }

    if (articulation != null) {
      return this.stave_articulations.push(articulation)
    }
  }

  // This gets the previous (second-to-last) non-bar non-ghost note.
  getPreviousNoteIndex() {
    let { tab_notes } = _.last(this.staves);
    let index = 2;
    while (index <= tab_notes.length) {
      let note = tab_notes[tab_notes.length - index];
      if (note instanceof Vex.Flow.TabNote) { return (tab_notes.length - index); }
      index++;
    }

    return -1;
  }

  addDecorator(decorator) {
    if (decorator == null) { return; }

    let stave = _.last(this.staves);
    let { tab_notes } = stave;
    let score_notes = stave.note_notes;
    let modifier = null;
    let score_modifier = null;

    if (decorator === "v") {
      modifier = new Vex.Flow.Vibrato();
    }
    if (decorator === "V") {
      modifier = new Vex.Flow.Vibrato().setHarsh(true);
    }
    if (decorator === "u") {
      modifier = new Vex.Flow.Articulation("a|").setPosition(Vex.Flow.Modifier.Position.BOTTOM);
      score_modifier = new Vex.Flow.Articulation("a|").setPosition(Vex.Flow.Modifier.Position.BOTTOM);
    }
    if (decorator === "d") {
      modifier = new Vex.Flow.Articulation("am").setPosition(Vex.Flow.Modifier.Position.BOTTOM);
      score_modifier = new Vex.Flow.Articulation("am").setPosition(Vex.Flow.Modifier.Position.BOTTOM);
    }

    if (modifier != null) { _.last(tab_notes).addModifier(modifier, 0); }
    if (score_modifier != null) {
      return __guard__(_.last(score_notes), x => x.addArticulation(0, score_modifier))
    }
  }

  addArticulations(articulations) {
    let stave = _.last(this.staves);
    let { tab_notes } = stave;
    let stave_notes = stave.note_notes;

    let current_tab_note = _.last(tab_notes);

    let has_bends = false;
    for (var valid_articulation of ["b", "s", "h", "p", "t", "T", "v", "V"]) {
      var current_indices, i, prev_indices, prev_tab_note;
      var indices = ((() => {
        let result = [];
        for (i = 0; i < articulations.length; i++) {
          let art = articulations[i];
          if ((art != null) && (art === valid_articulation)) {
            result.push(i);
          }
        }
        return result;
      })());
      if (_.isEmpty(indices)) { continue; }

      if (valid_articulation === "b") { has_bends = true; }
      let prev_index = this.getPreviousNoteIndex();
      if (prev_index === -1) {
        prev_tab_note = null;
        prev_indices = null;
      } else {
        var n;
        prev_tab_note = tab_notes[prev_index];
        // Figure out which strings the articulations are on
        var this_strings = ((() => {
          let result1 = [];
          let iterable = current_tab_note.getPositions();
          for (i = 0; i < iterable.length; i++) {
            n = iterable[i];
            if (Array.from(indices).includes(i)) {
              result1.push(n.str);
            }
          }
          return result1;
        })());

        // Only allows articulations where both notes are on the same strings
        var valid_strings = ((() => {
          let result2 = [];
          let iterable1 = prev_tab_note.getPositions();
          for (i = 0; i < iterable1.length; i++) {
            let pos = iterable1[i];
            if (Array.from(this_strings).includes(pos.str)) {
              result2.push(pos.str);
            }
          }
          return result2;
        })());

        // Get indices of articulated notes on previous chord
        prev_indices = ((() => {
          let result3 = [];
          let iterable2 = prev_tab_note.getPositions();
          for (i = 0; i < iterable2.length; i++) {
            n = iterable2[i];
            if (Array.from(valid_strings).includes(n.str)) {
              result3.push(i);
            }
          }
          return result3;
        })());

        // Get indices of articulated notes on current chord
        current_indices = ((() => {
          let result4 = [];
          let iterable3 = current_tab_note.getPositions();
          for (i = 0; i < iterable3.length; i++) {
            n = iterable3[i];
            if (Array.from(valid_strings).includes(n.str)) {
              result4.push(i);
            }
          }
          return result4;
        })());
      }

      if (stave.note != null) {
        this.addStaveArticulation(valid_articulation,
          stave_notes[prev_index], _.last(stave_notes),
          prev_indices, current_indices);
      }
    }
  }

  addRest(params) {
    let position;

    if (params["position"] === 0) {
      this.addStaveNote({
        spec: ["r/4"],
        accidentals: [],
        is_rest: true
      });
    } else {
      position = this.tuning.getNoteForFret((parseInt(params["position"], 10) + 5) * 2, 6);
      this.addStaveNote({
        spec: [position],
        accidentals: [],
        is_rest: true
      });
    }

    let { tab_notes } = _.last(this.staves);
    if (this.customizations["tab-stems"] === "true") {
      let tab_note = new Vex.Flow.StaveNote({
        keys: [position || "r/4"],
        duration: this.current_duration + "r",
        clef: "treble",
        auto_stem: false
      });
      if (this.current_duration[this.current_duration.length - 1] === "d") {
        tab_note.addDot(0);
      }
      return tab_notes.push(tab_note);
    } else {
      return tab_notes.push(new Vex.Flow.GhostNote(this.current_duration));
    }
  }

  addChord(chord, chord_articulation, chord_decorator) {
    let current_duration, play_note;
    if (_.isEmpty(chord)) { return; }

    let stave = _.last(this.staves);

    let specs = [];          // The stave note specs
    let play_notes = [];     // Notes to be played by audio players
    let accidentals = [];    // The stave accidentals
    let articulations = [];  // Articulations (ties, bends, taps)
    let decorators = [];     // Decorators (vibratos, harmonics)
    let tab_specs = [];      // The tab notes
    let durations = [];      // The duration of each position
    let num_notes = 0;

    // Chords are complicated, because they can contain little
    // lines one each string. We need to keep track of the motion
    // of each line so we know which tick they belong in.
    let current_string = _.first(chord).string;
    let current_position = 0;

    for (let note of Array.from(chord)) {
      num_notes++;
      if ((note.abc != null) || (note.string !== current_string)) {
        current_position = 0;
        current_string = note.string;
      }

      if (specs[current_position] == null) {
        // New position. Create new element arrays for this
        // position.
        specs[current_position] = [];
        play_notes[current_position] = [];
        accidentals[current_position] = [];
        tab_specs[current_position] = [];
        articulations[current_position] = [];
        decorators[current_position] = [];
      }

      let [new_note, new_octave, accidental] = Array.from([null, null, null]);

      play_note = null;

      if (note.abc != null) {
        var acc;
        let octave = (note.octave != null) ? note.octave : note.string;
        [new_note, new_octave, accidental] = Array.from(this.getNoteForABC(note.abc, octave));
        if (accidental != null) {
          acc = accidental.split("_")[0];
        } else {
          acc = "";
        }

        play_note = `${new_note}${acc}`;
        if (note.fret == null) { note.fret = 'X'; }
      } else if (note.fret != null) {
        [new_note, new_octave, accidental] = Array.from(this.getNoteForFret(note.fret, note.string));
        play_note = this.tuning.getNoteForFret(note.fret, note.string).split("/")[0];
      } else {
        throw new Vex.RERR("ArtistError", "No note specified");
      }

      let play_octave = parseInt(new_octave, 10) + this.current_octave_shift;

      current_duration = (note.time != null) ? {time: note.time, dot: note.dot} : null
      specs[current_position].push(`${new_note}/${new_octave}`)
      play_notes[current_position].push(`${play_note}/${play_octave}`)
      accidentals[current_position].push(accidental)
      tab_specs[current_position].push({fret: note.fret, str: note.string})
      if (note.articulation != null) { articulations[current_position].push(note.articulation) }
      durations[current_position] = current_duration
      if (note.decorator != null) { decorators[current_position] = note.decorator }

      current_position++
    }

    for (let i = 0; i < specs.length; i++) {
      let spec = specs[i]
      let saved_duration = this.current_duration

      if (durations[i] != null) {
        this.setDuration(durations[i].time, durations[i].dot)
      }

      this.addTabNote(tab_specs[i], play_notes[i])

      if (stave.note != null) {
        this.addStaveNote({spec, accidentals: accidentals[i], play_note: play_notes[i]})
      }

      this.addArticulations(articulations[i])

      if (decorators[i] != null) {
        this.addDecorator(decorators[i])
      }
    }

    if (chord_articulation != null) {
      let art = []
      for (let num = 1, end = num_notes, asc = 1 <= end; asc ? num <= end : num >= end; asc ? num++ : num--) {
        art.push(chord_articulation)
      }
      this.addArticulations(art);
    }

    if (chord_decorator != null) {
      return this.addDecorator(chord_decorator)
    }
  }

  addNote(note) {
    return this.addChord([note]);
  }

  addVoice(options) {
    let stave = _.last(this.staves)
    if (stave == null) { return this.addStave(options) }

    if (!_.isEmpty(stave.tab_notes)) {
      stave.tab_voices.push(stave.tab_notes)
      stave.tab_notes = []
    }

    if (!_.isEmpty(stave.note_notes)) {
      stave.note_voices.push(stave.note_notes)
      return stave.note_notes = []
    }
  }

  addStave(element, options) {
    let opts = {
      tuning: 'standard',
      clef: 'treble',
      key: 'C',
      notation: element === 'tabstave' ? 'false' : 'true',
      tablature: element === 'stave' ? 'false' : 'true',
      strings: 6
    }

    _.extend(opts, options)

    let tab_stave = null
    let note_stave = null

    // This is used to line up tablature and notation.
    let start_x = this.x + this.customizations["connector-space"]
    let tabstave_start_x = 40

    if (opts.notation === "true") {
      note_stave = new Vex.Flow.Stave(start_x, this.last_y, this.customizations.width - 20,
        {left_bar: false})
      if (opts.clef !== "none") { note_stave.addClef(opts.clef) }
      note_stave.addKeySignature(opts.key)
      if (opts.time != null) { note_stave.addTimeSignature(opts.time) }

      this.last_y += note_stave.getHeight() +
        this.options.note_stave_lower_spacing +
        parseInt(this.customizations["stave-distance"], 10)

      tabstave_start_x = note_stave.getNoteStartX()
      this.current_clef = opts.clef === "none" ? "treble" : opts.clef
    }

    if (opts.tablature === "true") {
      tab_stave = new Vex.Flow.TabStave(start_x, this.last_y, this.customizations.width - 20,
        {left_bar: false}).setNumLines(opts.strings)

      if (opts.clef !== "none") { tab_stave.addTabGlyph() }
      tab_stave.setNoteStartX(tabstave_start_x)
      this.last_y += tab_stave.getHeight() + this.options.tab_stave_lower_spacing
    }

    let beam_groups = Vex.Flow.Beam.getDefaultBeamGroups(opts.time)
    this.staves.push({
      tab: tab_stave,
      note: note_stave,
      tab_voices: [],
      note_voices: [],
      tab_notes: [],
      note_notes: [],
      text_voices: [],
      beam_groups
    })

    this.tuning.setTuning(opts.tuning)
    this.key_manager.setKey(opts.key)
  }

  runCommand(line, _l, _c) {
    if (_l == null) {
      _l = 0
    }

    if (_c == null) {
      _c = 0
    }

    let words = line.split(/\s+/);

    switch (words[0]) {
      case "octave-shift": {
        this.current_octave_shift = parseInt(words[1], 10)
        return
      }

      default: {
        throw new Vex.RERR("ArtistError", `Invalid command '${words[0]}' at line ${_l} column ${_c}`)
      }
    }
  }
};
