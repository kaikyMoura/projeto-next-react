import styles from "./Button.module.css"

interface ButtonProps {
    type?: 'primary' | 'secondary';
    size?: number | 15;
    text: string;
    action?: Function | any
}

const Button = ({ text, size, action }: ButtonProps) => {
    const handleClick = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        if (action) {
            action(event)
        }
    }

    return (
        <>
            <button className={styles.button} style={{ fontSize: size }} onClick={handleClick}>
                <p>{text}</p>
            </button>
        </>
    )
}

export default Button;