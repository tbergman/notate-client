// @flow

import React, { Component } from 'react';
import Stave from 'views/music/components/Stave'
import Note from 'views/music/components/Note'

import logo from './logo.svg'
import './App.css'

class App extends Component {
  render(): React.Element<any> {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <Stave clef={'treble'} description={'Notes'} notation={`
          stave notation=true tablature=false key=C time=4/4
          notes C-D-E-F-G-A-B/4 C/5`
        }/>

        <Stave clef={'treble'} description={'Different Durations'} notation={`
          stave notation=true tablature=false key=C time=4/4
          notes :w C-D/4 :h E-F/4 :q G-A/4 :8 B/4 C/5`
        }/>

        <Stave clef={'treble'} description={'Accidentals'} notation={`
          stave notation=true tablature=false key=C time=4/4
          notes A#3_4/5 C##-D@@-E/5 Fn/5 C@/4`
        }/>

        <Stave clef={'treble'} description={'Bar Line'} notation={`
          stave notation=true tablature=false key=C time=4/4
          notes C-D-E-F/4 | G-A-B/4 C/5`
        }/>

        <Stave clef={'treble'} description={'Fancy Bar Lines'} notation={`
          stave notation=true tablature=false key=C time=4/4
          notes C-D-E-F/4 =|: G-A-B/4 C/5 =:|`
        }/>

        <Stave clef={'treble'} description={'More Fancy Bar Lines'} notation={`
          stave notation=true tablature=false key=C time=4/4
          notes C-D-E-F/4 =:: G-A-B/4 C/5 =|=`
        }/>

        <Stave clef={'treble'} description={'Ties'} notation={`
          stave notation=true key=C time=4/4
          notes A/4 b A/4 b B/4 b C/4`
        }/>

        <Stave clef={'treble'} description={'Chords'} notation={`
          stave notation=true tablature=false key=C time=4/4
          notes :q (A/5.A/4) (A/5.A/4)`
        }/>

        <Stave clef={'treble'} description={'Rest'} notation={`
          stave notation=true tablature=false key=C time=4/4
          notes :w C/4 ## :h D/4 ## :q E/4 ## :8 F/4 ## :16 G/4 ##`
        }/>

        <Stave clef={'treble'} description={'Rest Positioning'} notation={`
          stave notation=true tablature=false key=C time=4/4
          notes C-D-E/4 #0# #1# #2# #3# #4# #5# #6# `
        }/>

        <Stave clef={'treble'} description={'Tuplets'} notation={`
          stave notation=true tablature=false key=C time=4/4
          notes :8 ChDhE/4 ^3^ F/4 :4 C-D-F-G-A/4 ^5^`
        }/>

        <Stave clef={'treble'} description={'Time Signature Beaming'} notation={`
          stave notation=true tablature=false key=C time=4/4
          notes :8 ## D-E-F-G-A-B/4 C/5`
        }/>

        <Stave clef={'treble'} description={'Time Signature Beaming 2'} notation={`
          stave notation=true tablature=false time=4/4
          notes :8 C-D-E-F/4 ## A-B/4 C-D-E-F-:16:G-F/5`
        }/>

        <Stave clef={'treble'} description={'Key Signature (A)'} notation={`
          stave notation=true tablature=false key=A time=4/4
          notes C-D-E-F-G-A-B/4 C/5`
        }/>

        <Stave clef={'treble'} description={'Bass Clef'} notation={`
          stave notation=true tablature=false key=C time=4/4 clef=bass
          notes C-D-E-F-G-A-B/3 C/4`
        }/>

        <Stave clef={'treble'} description={'Alto Clef'} notation={`
          stave notation=true tablature=false key=C time=4/4 clef=alto
          notes C-D-E-F-G-A-B/3 C/4`
        }/>

        <Stave clef={'treble'} description={'Tenor Clef'} notation={`
          stave notation=true tablature=false key=C time=4/4 clef=tenor
          notes C-D-E-F-G-A-B/3 C/4`
        }/>

        <Stave clef={'treble'} description={'Different Time Signature'} notation={`
          stave notation=true tablature=false clef=bass key=Ab time=C|
          notes C-D-E/3`
        }/>

        <Stave clef={'treble'} description={'Rhythm Notation'} notation={`
          stave notation=true tablature=false key=C time=4/4
          notes :16S (A/5.A/4) (A/5.A/4)`
        }/>
      </div>
    );
  }
}

export default App
