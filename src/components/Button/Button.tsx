import styles from "./Button.module.css"

interface ButtonProps {
    type?: 'primary' | 'secondary';
    size?: 'md' | 'lg';
    text: string;
    action?: Function | any
}

const Button = ({ text, size, action }: ButtonProps) => {
    let buttonSize = 10
    if (size == "lg") {
        buttonSize = 20
    }
    const handleClick = (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        if (action) {
            action(event)
        }
    }

    return (
        <>
            <button className={`${styles.button}`} style={{ width: buttonSize }} onClick={handleClick}>
                <p>{text}</p>
            </button>
        </>
    )
}

export default Button;