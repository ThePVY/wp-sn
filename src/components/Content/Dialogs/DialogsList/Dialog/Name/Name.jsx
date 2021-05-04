import styles from './Name.module.css'
import { NavLink } from 'react-router-dom';

const Name = (props) => {
    const path = `/dialogs/${props.state.id}`;
    return (
        <div className={styles.name}>
            <NavLink to={path} activeClassName={styles.active}>
                {props.state.name}
            </NavLink>
        </div>
    );
};

export default Name;