import { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { thunkCreator } from '../../../redux/auth-reducer'
import styles from './News.module.css'

const News = props => {

    const submit = jsonObj => {
        console.log(jsonObj)
    }

    return (
        <div className={styles.news} >
            <Form onSubmit={submit} />
        </div>
    )
}

export default compose(
    connect(null, { ...thunkCreator })
)(News)



/*---------------------------------------------------------------------------------------------------*/

let Form = (props) => {

    const [option, setOption] = useState('1')

    return (
        <form onSubmit={props.handleSubmit} className={styles.form} multiple={true} >
            <label>
                Pick your favourite number
                <select value={option} onChange={(e) => setOption(e.target.value)} >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </label>
        </form>
    )
}

//Form = reduxForm({ form: 'news' })(Form)