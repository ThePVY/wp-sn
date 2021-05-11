import styles from './DialogsList.module.css'
import Dialog from './Dialog/Dialog'

const DialogsList = ({ dialogsList, setDialogId }) => {
    console.log('React called DialogsList')
    return (
        <div className={styles.dialogsList}>
            <div className={styles.content}>
                {
                    dialogsList.map((dialog) => <Dialog key={dialog.id} dialog={dialog} setDialogId={setDialogId} />)
                }
            </div>
        </div>
    )
}

export default DialogsList;