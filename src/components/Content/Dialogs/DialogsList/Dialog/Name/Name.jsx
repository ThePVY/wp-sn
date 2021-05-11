import styles from './Name.module.css'
import { NavLink } from 'react-router-dom';

const Name = ({ dialog, setDialogId }) => {
    const path = `/dialogs/${dialog.id}`;
    return (
        <div className={styles.name}>
            <NavLink to={path} activeClassName={styles.active} onClick={() => setDialogId(dialog.id)} >
                {dialog.name}
            </NavLink>
        </div>
    );
};

export default Name;