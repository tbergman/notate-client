/* eslint-disable */

// VexTab Artist
// Copyright 2012 Mohit Cheppudira <mohit@muthanna.com>
//
// This class is responsible for rendering the elements
// parsed by Vex.Flow.VexTab.

import Vex from 'vexflow'
import _ from 'lodash'

import ArtistAnnotations from './artist.annotations'
import ArtistTuplets from './artist.tuplets'
import ArtistBars from './artist.bars'
import ArtistRests from './artist.rests'
import ArtistArticulations from './artist.articulations'
import ArtistLayers from './artist.layers'

let parseBool = str => str === "true"

const __guard__ = (value, transform) => {
  return (typeof value !== 'undefined' && value !== null) ? transform(value) : undefined
}

export default class Artist {
  constructor(x, y, width, options) {
    this.x = x
    this.y = y
    this.width = width

    this.options = {
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
    this.bars = new ArtistBars(this)
    this.rests = new ArtistRests(this)
    this.articulations = new ArtistArticulations(this)
    this.layers = new ArtistLayers(this)

    this.reset()
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

  formatAndRender(ctx, tab, score, text_notes, customizations, options) {
    let i, multi_voice, notes, score_stave, tab_stave

    let scoreVoices = []
    let textVoices = []
    let beams = []

    multi_voice = (score.voices.length > 1) ? true : false

    ctx.attributes.fill = null
    ctx.attributes.stroke = null

    _(score.voices)
      .filter(notes => !_.isEmpty(notes))
      .each((notes, i) => {
        const stemDirection = i === 0 ? 1 : -1

        const result = this.createNotesVoice(ctx, score.stave, notes, stemDirection, multi_voice, customizations)

        scoreVoices.push(result.voice)
        beams = beams.concat(result.beams)
      })

    _(text_notes)
      .filter(notes => !_.isEmpty(notes))
      .each((notes, i) => {
        const result = this.createTextVoice(score.stave, notes)

        textVoices.push(result.voice)
      })

    const alignRests = (scoreVoices.length > 1)
    const formatter = new Vex.Flow.Formatter()
    const voicesToFormat = _([])
      .concat(scoreVoices)
      .concat(textVoices)
      .filter(x => !_.isEmpty(x))
      .value()

    formatter.joinVoices(voicesToFormat)
    formatter.formatToStave(voicesToFormat, score.stave, { align_rests: alignRests })

    this.scoreVoices = scoreVoices

    this.layers.drawBaseLayer(ctx, score.stave, scoreVoices, beams, textVoices)

    return scoreVoices
  }

  drawOptions(toolbox) {
    this.layers.drawOptionsLayer(this.renderer_context, this.staves[0].note, this.scoreVoices, toolbox)
  }

  createTextVoice(stave, textNotes) {
    _.each(textNotes, note => note.setStave(stave))

    const voice = new Vex.Flow.Voice(Vex.Flow.TIME4_4)
      .setMode(Vex.Flow.Voice.Mode.SOFT)

    voice.addTickables(textNotes)

    return { voice }
  }

  createNotesVoice(context, stave, notes, stemDirection, multiVoice, customizations) {
    let beamConfig = {
      beam_rests: parseBool(customizations['beam-rests']),
      show_stemlets: parseBool(customizations['beam-stemlets']),
      beam_middle_only: parseBool(customizations['beam-middle-only']),
      stem_direction: (multiVoice ? stemDirection : null),
      groups: this.options.beam_groups,
    }

    _.each(notes, note => note.setContext(context).setStave(stave))

    const beams = Vex.Flow.Beam.generateBeams(notes, beamConfig)

    const voice = new Vex.Flow.Voice(Vex.Flow.TIME4_4)
      .setMode(Vex.Flow.Voice.Mode.SOFT)

    voice.addTickables(notes)

    return { voice, beams }
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
  }

  render(renderer) {
    const width = this.customizations.width * this.customizations.scale
    const height = (this.last_y + this.options.bottom_spacing) * this.customizations.scale
    renderer.resize(width, height)

    let ctx = renderer.getContext()
    ctx.scale(this.customizations.scale, this.customizations.scale)
    ctx.clear()
    ctx.setFont(this.options.font_face, this.options.font_size, '')

    this.renderer_context = ctx

    let setBar = function(stave, notes) {
      let last_note = _.last(notes)
      if (last_note instanceof Vex.Flow.BarNote) {
        notes.pop()
        return stave.setEndBarType(last_note.getType())
      }
    }

    for (let stave of Array.from(this.staves)) {
      // If the last note is a bar, then remove it and render it as a stave modifier.
      if (stave.tab != null) { setBar(stave.tab, stave.tab_notes); }
      if (stave.note != null) { setBar(stave.note, stave.note_notes); }

      if (stave.tab != null) { stave.tab.setContext(ctx).draw(); }
      if (stave.note != null) { stave.note.setContext(ctx).draw(); }

      stave.tab_voices.push(stave.tab_notes)
      stave.note_voices.push(stave.note_notes)

      const tab = (stave.tab != null) ? { stave: stave.tab, voices: stave.tab_voices } : null
      const score = (stave.note != null) ? { stave: stave.note, voices: stave.note_voices } : null
      const options = { beam_groups: stave.beam_groups }

      this.formatAndRender(ctx, tab, score, stave.text_voices, this.customizations, options)
    }

    for (var articulation of Array.from(this.tab_articulations)) {
      articulation.setContext(ctx).draw()
    }

    for (articulation of Array.from(this.stave_articulations)) {
      articulation.setContext(ctx).draw()
    }

    this.rendered = true;
  }

  drawLayer(notes, layerId) {
    this.layers.drawLayer(this.renderer_context, this.staves[0].note, notes, layerId)
  }

  isRendered() { return this.rendered; }

  draw(renderer) { return this.render(renderer); }

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

    const makeDuration = (time, dot) => time + (dot ? 'd' : '')

    return this.current_duration = makeDuration(t[0], dot)
  }

  addDecorator(decorator) {
    if (decorator == null) {
      return
    }

    let stave = _.last(this.staves)
    let { tab_notes } = stave
    let score_notes = stave.note_notes
    let score_modifier = null

    if (decorator === "u") {
      score_modifier = new Vex.Flow.Articulation("a|").setPosition(Vex.Flow.Modifier.Position.BOTTOM)
    }
    if (decorator === "d") {
      score_modifier = new Vex.Flow.Articulation("am").setPosition(Vex.Flow.Modifier.Position.BOTTOM)
    }

    if (score_modifier != null) {
      return __guard__(_.last(score_notes), x => x.addArticulation(0, score_modifier))
    }
  }

  addChord(chord, chord_articulation, chord_decorator) {
    let current_duration, play_note
    if (_.isEmpty(chord)) {
      return
    }

    let stave = _.last(this.staves)

    let specs = []          // The stave note specs
    let play_notes = []     // Notes to be played by audio players
    let accidentals = []    // The stave accidentals
    let articulations = []  // Articulations (ties, bends, taps)
    let decorators = []     // Decorators (vibratos, harmonics)
    let tab_specs = []      // The tab notes
    let durations = []      // The duration of each position
    let num_notes = 0

    // Chords are complicated, because they can contain little
    // lines one each string. We need to keep track of the motion
    // of each line so we know which tick they belong in.
    let current_string = _.first(chord).string
    let current_position = 0

    for (let note of Array.from(chord)) {
      num_notes++
      if ((note.abc != null) || (note.string !== current_string)) {
        current_position = 0
        current_string = note.string
      }

      if (specs[current_position] == null) {
        // New position. Create new element arrays for this
        // position.
        specs[current_position] = []
        play_notes[current_position] = []
        accidentals[current_position] = []
        tab_specs[current_position] = []
        articulations[current_position] = []
        decorators[current_position] = []
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
      } else if (note.fret == null) {
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

      this.articulations.addArticulations(articulations[i])

      if (decorators[i] != null) {
        this.addDecorator(decorators[i])
      }
    }

    if (chord_articulation != null) {
      let art = []
      for (let num = 1, end = num_notes, asc = 1 <= end; asc ? num <= end : num >= end; asc ? num++ : num--) {
        art.push(chord_articulation)
      }
      this.articulations.addArticulations(art);
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
};
