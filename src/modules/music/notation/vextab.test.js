// @flow

import Vex from 'vexflow'
import VexTab from './vextab'
import Artist from './artist'

describe('notation parser', () => {
  let renderer, vextab

  const assertVextabParsesCode = (code) => {
    expect(vextab.parse(code)).toBeDefined()
    vextab.getArtist().render(renderer)
  }

  beforeAll(() => {
    const element = document.createElement('div');
    renderer = new Vex.Flow.Renderer(element, Vex.Flow.Renderer.Backends.SVG)
    renderer.getContext().setBackgroundFillStyle("#eed")
  })

  beforeEach(() => {
    vextab = new VexTab(new Artist(0, 0, 600, {scale: 0.8}))
  })

  it('notes', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes C-D-E-F-G-A-B/4 C/5
    `
    assertVextabParsesCode(code)
  })

  it('different durations', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes :w C-D/4 :h E-F/4 :q G-A/4 :8 B/4 C/5
    `
    assertVextabParsesCode(code)
  })

  it('accidentals', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes A#/3 C##-D@@-E/5 Fn/5 C@/4
    `
    assertVextabParsesCode(code)
  })

  it('bar line', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes C-D-E-F/4 | G-A-B/4 C/5 =||
    `
    assertVextabParsesCode(code)
  })

  it('more bar lines', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes C-D-E-F/4 =|: G-A-B/4 C/5 =:|
    `
    assertVextabParsesCode(code)
  })

  it('even more bar lines', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes C-D-E-F/4 =:: G-A-B/4 C/5 =|=
    `
    assertVextabParsesCode(code)
  })

  it('ties', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes A/4 T A/4 T B/4 T C/4
    `
    assertVextabParsesCode(code)
  })

  it('chords', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes :q (A/4.A/5) (A/4.A/5)
    `
    assertVextabParsesCode(code)
  })

  it('rests', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes :w C/4 ## :h D/4 ## :q E/4 ## :8 F/4 ## :16 G/4 ##
    `
    assertVextabParsesCode(code)
  })

  it('rest positioning', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes C-D-E/4 #0# #1# #2# #3# #4# #5# #6#
    `
    assertVextabParsesCode(code)
  })

  it('tuplets', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes :8 ChDhE/4 ^3^ F/4 :4 C-D-F-G-A/4 ^5^
    `
    assertVextabParsesCode(code)
  })

  it('time signature beaming', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes :8 ## D-E-F-G-A-B/4 C/5
    `
    assertVextabParsesCode(code)
  })

  it('more time signature beaming', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes :8 C-D-E-F/4 ## A-B/4 C-D-E-F-:16:G-F/5
    `
    assertVextabParsesCode(code)
  })

  it('key signature', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4 key=A
      notes C-D-E-F-G-A-B/4 C/5
    `
    assertVextabParsesCode(code)
  })

  it('bass clef', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4 clef=bass
      notes C-D-E-F-G-A-B/3 C/4
    `
    assertVextabParsesCode(code)
  })

  it('clef alto', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4 clef=alto
      notes C-D-E-F-G-A-B/3 C/4
    `
    assertVextabParsesCode(code)
  })

  it('clef tenor', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4 clef=tenor
      notes C-D-E-F-G-A-B/3 C/4
    `
    assertVextabParsesCode(code)
  })

  it('time signature 2/2', () => {
    const code = `
      tabstave notation=true tablature=false time=2/2
      notes C-D-E-F-G-A-B/4 C/5
    `
    assertVextabParsesCode(code)
  })

  it('time signature 6/8', () => {
    const code = `
      tabstave notation=true tablature=false time=6/8
      notes C-D-E-F-G-A-B/4 C/5
    `
    assertVextabParsesCode(code)
  })

  it('time signature C', () => {
    const code = `
      tabstave notation=true tablature=false time=C
      notes C-D-E-F-G-A-B/4 C/5
    `
    assertVextabParsesCode(code)
  })

  it('time signature C|', () => {
    const code = `
      tabstave notation=true tablature=false time=C|
      notes C-D-E-F-G-A-B/4 C/5
    `
    assertVextabParsesCode(code)
  })

  it('annotations', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes C-E-G/4 ## | G-B/4 D/5 ##
      text :w, C Major, G Major
    `
    assertVextabParsesCode(code)
  })

  it('annotation options', () => {
    const code = `
      options font-face=courier font-style=bold
      tabstave notation=true tablature=false time=4/4
      notes C-E-G/4 ## | G-B/4 D/5 ##
      text :w, C Major, G Major
    `
    assertVextabParsesCode(code)
  })

  it('annotation inline styles', () => {
    const code = `
      options font-face=courier font-style=bold
      tabstave notation=true tablature=false time=4/4
      notes C-E-G/4 ## | G-B/4 D/5 ##
      text :w, C Major, .font=Arial-14-bold, G Major
    `
    assertVextabParsesCode(code)
  })

  it('note annotations', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes C/4 $C$ E/4 $E$ G/4 $G$ ##
    `
    assertVextabParsesCode(code)
  })

  it('note annotations styles', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes C/4 $.italic.C$ E/4 $.big.E$ G/4 $.medium.G$ B/4 $.top.B$ C/5 $.bottom.C$
    `
    assertVextabParsesCode(code)
  })

  it('rhythm notation', () => {
    const code = `
      tabstave notation=true tablature=false time=4/4
      notes :16S (A/4.A/5) (A/4.A/5)
    `
    assertVextabParsesCode(code)
  })
})
