import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css'

const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <nav>
                <div className={styles.item}>
                    <NavLink to='/profile' activeClassName={styles.active}>Profile</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/dialogs' activeClassName={styles.active}>Messages</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/news' activeClassName={styles.active}>News</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/users' activeClassName={styles.active}>Users</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/images' activeClassName={styles.active}>Images</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/music' activeClassName={styles.active}>Music</NavLink>
                </div>
                <div className={styles.item}>
                    <NavLink to='/video' activeClassName={styles.active}>Video</NavLink>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;