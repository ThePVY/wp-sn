import { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { change, Field, reduxForm } from 'redux-form'
import { useValidation } from '../../../../../hooks/useValidation'
import { noErrorRequired, validate50 } from '../../../../../scripts/validates'
import { Button } from '../../../../common/Button'
import { TextareaTemplate } from '../../../../common/CustomFields/CustomFields'
import styles from './ProfileStatus.module.css'


let StatusForm = props => {
  const { dispatch, status, handleSubmit, cancel } = props

  const [statusVO] = useValidation(false)

  useEffect(() => {
    dispatch(change('status', 'status', status))
  }, [status, dispatch])

  return (
    <form className={styles.statusForm} onSubmit={handleSubmit}>
      <div>
        <Field
          component={TextareaTemplate}
          name='status'
          type='text'
          autoFocus
          placeholder='Enter your Status'
          validate={[noErrorRequired, validate50]}
          isValid={statusVO.setIsValid}
        />
      </div>
      <div className={styles.buttonsContainer}>
        <Button type='submit' disabled={!statusVO.isValid}>
          Publish
        </Button>
        <Button type='button' onClick={cancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

StatusForm = reduxForm({ form: 'status' })(StatusForm)

const ProfileStatus = props => {
  const { status = 'No status...', publishStatus, authId } = props
  const { userId = authId } = props.match.params

  const [editMode, setEditMode] = useState(false)

  const toggleMode = () => {
    if (authId === userId) {
      setEditMode(!editMode)
    }
  }

  const publish = ({ status }) => {
    publishStatus(status)
    setEditMode(false)
  }

  return (
    <div className={styles.profileStatus}>
      {editMode ? (
        <StatusForm onSubmit={publish} cancel={toggleMode} status={status} />
      ) : (
        <div className={styles.statusContainer}>
          <span onClick={toggleMode} role='textbox' tabIndex='0'>{status}</span>
        </div>
      )}
    </div>
  )
}

export default withRouter(ProfileStatus)

/*---------------------------------------------------------------------------------*/


