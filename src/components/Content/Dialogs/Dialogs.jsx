import CurrentDialog from './CurrentDialog/CurrentDialog'
import DialogsList from './DialogsList/DialogsList'
import { WithAuthRedirection } from '../../hoc/withAuthRedirection'
import { compose } from 'redux'
import { connect } from 'react-redux'
import selector from '../../../redux/selectors'
import { actionCreator } from '../../../redux/dialogs-reducer'
import { resetForm, spinLogoOn } from '../../../redux/app-reducer'
import SplitContent from '../../common/SplitContent/SplitContent'
import FixedHeight from '../../common/FixedHeight/FixedHeight'

const Dialogs = ({ dialogsList, messages, spinLogoOn, addMessage, resetForm }) => {
  const propsToCD = { messages, spinLogoOn, addMessage, resetForm }
  return (
    <FixedHeight>
      <SplitContent
        colorLeft={true}
        colorRight={false}
        left={<DialogsList dialogsList={dialogsList} />}
        right={<CurrentDialog {...propsToCD} />}
      />
    </FixedHeight>
  )
}

const mapStateToProps = state => {
  return {
    messages: selector.dialogs.getMessages(state),
    dialogsList: selector.dialogs.getDialogsList(state),
  }
}

export default compose(
  connect(mapStateToProps, { resetForm, ...actionCreator, spinLogoOn }),
  WithAuthRedirection
)(Dialogs)
