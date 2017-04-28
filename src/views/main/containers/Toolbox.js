//@flow
import { connect } from 'react-redux'
import { selectAccidental as setAccidental, selectDuration as setDuration } from 'modules/toolbox/actions'
import ToolboxStub from 'modules/toolbox/components/ToolboxStub'
export default connect(null, { setAccidental, setDuration })(ToolboxStub)
