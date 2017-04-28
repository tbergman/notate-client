//@flow
import { connect } from 'react-redux'
import { selectAccidental as setAccidental, selectDuration as setDuration } from 'modules/toolbox/actions'
import { selectSelectedAccidental } from 'modules/toolbox/selectors'
import ToolboxStub from 'modules/toolbox/components/ToolboxStub'
const mapStateToProps = (state) => ({
  selectedAccidental: selectSelectedAccidental(state)
})
export default connect(mapStateToProps, { setAccidental, setDuration })(ToolboxStub)
