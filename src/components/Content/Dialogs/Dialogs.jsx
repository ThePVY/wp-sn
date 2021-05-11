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
import { useState } from 'react'

const Dialogs = ({ dialogsList, spinLogoOn, addMessage, resetForm }) => {
  const [dialogId, setDialogId] = useState(dialogsList[0].id)
  const dialog = dialogsList[dialogId]
  const propsToCD = { dialog, spinLogoOn, addMessage, resetForm }
  return (
    <FixedHeight>
      <SplitContent
        colorLeft={true}
        colorRight={false}
        left={<DialogsList dialogsList={dialogsList} setDialogId={setDialogId} />}
        right={<CurrentDialog {...propsToCD} />}
      />
    </FixedHeight>
  )
}

const mapStateToProps = state => {
  return {
    dialogsList: selector.dialogs.getDialogsList(state),
  }
}

export default compose(
  connect(mapStateToProps, { resetForm, ...actionCreator, spinLogoOn }),
  WithAuthRedirection
)(Dialogs)
