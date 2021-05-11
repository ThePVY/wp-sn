import styles from './Ava.module.css'
import { NavLink } from 'react-router-dom';
import defaultUserImage from '../../../../../../images/user-image.png'

const Ava = ({ dialog, setDialogId }) => {
    const path = `/dialogs/${dialog.id}`;
    return (
        <div className={styles.ava}>
            <NavLink to={path} activeClassName={styles.active} onClick={() => setDialogId(dialog.id)} >
                <img src={dialog.src || defaultUserImage} alt="q" />
            </NavLink>
        </div>
    );
};


export default Ava;