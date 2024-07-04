import { SetStateAction, useEffect, useState } from "react"
import Button from "../components/Button/Button"
import Input from "../components/Input/Input"
import Alert from "../utils/notificacao"
import { createUser } from "../api/services/serviceUser"
import { useRouter } from "next/router"
import Link from "next/link"
import styles from "../styles/loginpage.module.css"


const CreateUserPage = () => {

    const [alerta, setAlerta] = useState(Boolean)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repetPassword, setRepetPassword] = useState("")


    const router = useRouter()

    const criarUsuario = async () => {
        console.log(password)
        console.log(repetPassword)

        if (password != repetPassword) {
            console.error("Erro")
        }

        const usuario = {
            email: email,
            password: password
        }

        console.log(usuario)
        await createUser(usuario).then(() => {
            setAlerta(true)
            router.push('/')
        }).catch((erro) => {
            console.error("Erro: ", erro)
        })
    }

    useEffect(() => {

    }, [email, password, repetPassword])

    const Closer = () => {
        setAlerta(false)
    }

    return (
        <>
            <div className={`${styles.container}`}>
                <form className="form-container">
                    <h2>Criar Usuário</h2>
                    <Input label={"Email"} placeholder={"email"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setEmail(e.target.value)} type={"email"} />
                    <Input label={"Senha"} placeholder={"senha"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setPassword(e.target.value)
                    } type={"password"} />
                    <Input label={"Repetir senha"} placeholder={"repita a senha"} onChange={(e: { target: { value: SetStateAction<string> } }) => {
                        setRepetPassword(e.target.value)
                    }} type={"password"} />
                    <br />
                    <div className="buton">
                        <Button text={"salvar"} action={criarUsuario} />
                    </div>
                    <br />
                    <div>
                        já tem uma conta ? <Link href="/">clique aqui</Link>
                    </div>
                </form>
            </div>

            {alerta ? <Alert type={"sucess"} titulo={"Usuário cadastrado com sucesso!"} Close={Closer} /> : null}
        </>
    )
}

export default CreateUserPage