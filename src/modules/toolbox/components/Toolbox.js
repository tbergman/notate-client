// @flow

import type { AppState } from 'modules/reducers'
import type { Tools } from 'Types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { setDuration, setAccidental } from 'modules/toolbox/actions'
import { selectSelectedAccidental, selectSelectedDuration } from 'modules/toolbox/selectors'
import AccidentalBox from './AccidentalBox'
type StateProps = {
    toolbox: Tools,
}

type DispatchProps = {
    setDuration: Function,
    setAccidental: Function,
}

type Props = StateProps & DispatchProps


export class Toolbox extends PureComponent{
    props: Props
    onSelectDuration = ( newDuration: number ) => this.props.setDuration(newDuration);
    onSelectAccidental = ( newAccidental: number ) => this.props.setAccidental(newAccidental);

    render(): React.Element<any> {
        const { toolbox } = this.props;
        console.info('toolbox', toolbox)

        return (
            <div>
                <AccidentalBox
                    selected={toolbox.selectedAccidental}
                    allowedAccidentals={[-1,0,1]}
                    onSelectAccidental={this.onSelectAccidental}/>
            </div>
        )
    }

}



const mapStateToProps = (state: AppState) => ({
    selectedAccidental: selectSelectedAccidental(state),
    selectedDuration: selectSelectedDuration(state)
});

export default connect(mapStateToProps, { setDuration, setAccidental })(Toolbox);