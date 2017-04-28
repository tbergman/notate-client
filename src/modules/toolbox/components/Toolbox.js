// @flow

import type { AppState } from 'modules/reducers'
import type { Tools } from 'Types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { selectDuration, selectAccidental } from 'modules/toolbox/actions'
import { selectToolboxes } from 'modules/toolbox/selectors'
import AccidentalBox from './AccidentalBox'
type StateProps = {
    toolbox: Tools,
}

type DispatchProps = {
    selectDuration: Function,
    selectAccidental: Function,
}

type Props = StateProps & DispatchProps


export class Toolbox extends PureComponent{
    props: Props
    onSelectDuration = ( newDuration: number ) => this.props.selectDuration(newDuration);
    onSelectAccidental = ( newAccidental: number ) => this.props.selectAccidental(newAccidental);

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
    toolbox: selectToolboxes(state)
});

export default connect(mapStateToProps, { selectDuration, selectAccidental })(Toolbox);