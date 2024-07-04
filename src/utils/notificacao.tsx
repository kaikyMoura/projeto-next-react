import styles from "../styles/notificacao.module.css";

interface AlertProps {
    type: "error" | "sucess" | "notification",
    Close?: Function | any,
    titulo: string
}

const Alert = ({ Close, titulo, type }: AlertProps) => {
    switch(type) {
        case "error":
        case "sucess":
        case "notification":
    }

    return (
        <>
            <div className={`${styles.modalBlur}`}>
                <button onClick={Close}></button>
                <div>
                    {titulo}
                </div>
            </div>
        </>
    )
}

export default Alert;