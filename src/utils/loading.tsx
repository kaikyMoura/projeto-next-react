import styles from '../styles/loading.module.css'

const Loading = () => {
    return (
        <div className={`${styles.modal}`}>
            <div className={`${styles.loader}`}>
                <span>Aguarde...</span>
            </div>
        </div>
    )
}

export default Loading;