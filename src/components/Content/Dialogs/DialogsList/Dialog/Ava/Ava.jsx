import styles from './Ava.module.css'
import { NavLink } from 'react-router-dom';
import defaultUserImage from '../../../../../../images/user-image.png'

const Ava = (props) => {
    const path = `/dialogs/${props.state.id}`;
    return (
        <div className={styles.ava}>
            <NavLink to={path} activeClassName={styles.active}>
                <img src={props.state.src || defaultUserImage} alt="q" />
            </NavLink>
        </div>
    );
};


export default Ava;