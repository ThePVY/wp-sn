import s from './SinglePane.module.css'

const SinglePane = ({ children, fixedHeight = false }) => {
    
    const style = `${s.pane} ${fixedHeight && s.fixedHeight}`
    
    return (
        <div className={style}>
            <div></div>
            <div className={s.content}>{children}</div>
            <div></div>
        </div>
    )
}

export default SinglePane
