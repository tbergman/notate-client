//@flow
import { connect } from 'react-redux'
import { setAccidental, setDuration } from 'modules/toolbox/actions'
import { selectSelectedAccidental, selectSelectedDuration } from 'modules/toolbox/selectors'
import ToolboxStub from 'modules/toolbox/components/ToolboxStub'
const mapStateToProps = (state) => ({
    selectedAccidental: selectSelectedAccidental(state),
    selectedDuration : selectSelectedDuration(state)
})
export default connect(mapStateToProps, { setAccidental, setDuration })(ToolboxStub)
