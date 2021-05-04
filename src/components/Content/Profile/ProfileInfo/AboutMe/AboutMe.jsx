import styles from './AboutMe.module.css'

const AboutMe = ({ aboutMe, name }) => {
    return (
        <div className={styles.aboutMe}>
            <div className={styles.name}>
                <span>{name}</span>
            </div>
            <div>
                <span className={styles.header}>About Me</span>
            </div>
            {
                aboutMe
            }
        </div>
    );
};

export default AboutMe;