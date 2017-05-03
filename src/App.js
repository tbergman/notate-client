// @flow

import React, { Component } from 'react';
import Stave from 'views/music/components/Stave'

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

        <Stave description={'Notes'} notes={`
          C-D-E-F-G-A-B/4 C/5`
        }/>

        <Stave description={'Different Durations'} notes={`
          :w C-D/4 :h E-F/4 :q G-A/4 :8 B/4 C/5`
        }/>

        <Stave description={'Accidentals'} notes={`
          A#/3 C##-D@@-E/5 Fn/5 C@/4`
        }/>

        <Stave description={'Bar Line'} notes={`
          C-D-E-F/4 | G-A-B/4 C/5`
        }/>

        <Stave description={'Fancy Bar Lines'} notes={`
          C-D-E-F/4 =|: G-A-B/4 C/5 =:|`
        }/>

        <Stave description={'More Fancy Bar Lines'} notes={`
          C-D-E-F/4 =:: G-A-B/4 C/5 =|=`
        }/>

        <Stave description={'Ties'} notes={`
          A/4 T A/4 T B/4 T C/4`
        }/>

        <Stave description={'Chords'} notes={`
          :q (A/4.A/5) (A/4.A/5)`
        }/>

        <Stave description={'Rest'} notes={`
          :w C/4 ## :h D/4 ## :q E/4 ## :8 F/4 ## :16 G/4 ##`
        }/>

        <Stave description={'Rest Positioning'} notes={`
          C-D-E/4 #0# #1# #2# #3# #4# #5# #6# `
        }/>

        <Stave description={'Tuplets'} notes={`
          :8 ChDhE/4 ^3^ F/4 :4 C-D-F-G-A/4 ^5^`
        }/>

        <Stave description={'Time Signature Beaming'} notes={`
          :8 ## D-E-F-G-A-B/4 C/5`
        }/>

        <Stave description={'Time Signature Beaming 2'} notes={`
          :8 C-D-E-F/4 ## A-B/4 C-D-E-F-:16:G-F/5`
        }/>

        <Stave keySignature={'A'} description={'Key Signature (A)'} notes={`
          C-D-E-F-G-A-B/4 C/5`
        }/>

        <Stave clef={'bass'} description={'Bass Clef'} notes={`
          C-D-E-F-G-A-B/3 C/4`
        }/>

        <Stave clef={'alto'} description={'Alto Clef'} notes={`
          C-D-E-F-G-A-B/3 C/4`
        }/>

        <Stave clef={'tenor'} description={'Tenor Clef'} notes={`
          C-D-E-F-G-A-B/3 C/4`
        }/>

        <Stave time={'C|'} keySignature={'Ab'} description={'Different Time Signature'} notes={`
          C-D-E/4`
        }/>

        <Stave description={'Rhythm Notation'} notes={`
          :16S (A/4.A/5) (A/4.A/5)`
        }/>

        <Stave description={'Annotations'} annotations={':w, C Major, G Major'} notes={`
          C-E-G/4 ## | G-B/4 D/5 ##`
        }/>
      </div>
    );
  }
}

export default App
