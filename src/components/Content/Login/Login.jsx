import Button from '@/components/common/Button'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import { useValidation } from '../../../hooks/useValidation'
import { thunkCreator } from '../../../redux/auth-reducer'
import { required } from '../../../scripts/validates'
import { InputTemplate, createField } from '../../common/CustomFields/CustomFields'
import SinglePane from '../../common/SinglePane/SinglePane'
import withProfileRedirection from '../../hoc/withProfileRedirection'
import styles from './Login.module.css'

const Login = (props) => {
  const submit = (jsonObj) => {
    props.signIn(jsonObj)
  }

  return (
    <SinglePane absolute={false}>
      <LoginForm onSubmit={submit} />
    </SinglePane>
  )
}

export default compose(connect(null, { ...thunkCreator }), withProfileRedirection)(Login)

/*---------------------------------------------------------------------------------------------------*/

let LoginForm = (props) => {
  const [email] = useValidation(false)
  const [password] = useValidation(false)

  return (
    <form onSubmit={props.handleSubmit} className={styles.loginForm}>
      {createField({
        component: InputTemplate,
        name: 'email',
        type: 'email',
        placeholder: 'Email',
        validate: [required],
        isValid: email.setIsValid
      })}
      {createField({
        component: InputTemplate,
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        validate: [required],
        isValid: password.setIsValid
      })}
      {createField({
        component: InputTemplate,
        name: 'rememberMe',
        type: 'checkbox',
        text: 'Remember me'
      })}
      {props.error ? (
        <div>
          <span className={styles.error}>{props.error}</span>
        </div>
      ) : (
        ''
      )}
      <div>
        <Button type="submit" disabled={!email.isValid || !password.isValid}>
          Submit
        </Button>
      </div>
    </form>
  )
}

LoginForm = reduxForm({ form: 'login' })(LoginForm)
