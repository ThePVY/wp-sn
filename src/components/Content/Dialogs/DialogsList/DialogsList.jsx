import styles from './DialogsList.module.css'
import Dialog from './Dialog/Dialog'

const DialogsList = ({ dialogsList }) => {
    console.log('React called DialogsList')
    return (
        <div className={styles.dialogsList}>
            <div className={styles.content}>
                {
                    dialogsList.map((obj, i) => <Dialog key={i} state={obj} />)
                }
            </div>
        </div>
    )
}

export default DialogsList;