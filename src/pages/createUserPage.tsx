import { SetStateAction, useEffect, useState } from "react"
import Button from "../components/Button/Button"
import Input from "../components/Input/Input"
import Alert from "../utils/notificacao"
import { createUser } from "../api/services/serviceUser"
import { useRouter } from "next/router"
import Link from "next/link"
import styles from "../styles/loginpage.module.css"
import Loading from "@/utils/loading"


const CreateUserPage = () => {

    const [alerta, setAlerta] = useState(false)
    const [carregando, setCarregando] = useState(false)

    const [nome, setNome] = useState("")
    const [sobreNome, setSobreNome] = useState("")
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

        const usuario:IUserLogin = {
            name: nome,
            lastName: sobreNome,
            image: null,
            email: email,
            password: password
        }

        console.log(usuario)
        setCarregando(true)
        await createUser(usuario).then(() => {
            setAlerta(true)
            setCarregando(false)
            router.push('/loginPage')
        }).catch((erro) => {
            setCarregando(false)
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
                <form className={`${styles.formContainer}`}>
                    <h2>Criar Usuário</h2>
                    <Input label={"Nome"} placeholder={"nome"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setNome(e.target.value)} type={"text"} />

                    <Input label={"Sobre nome"} placeholder={"nome"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setSobreNome(e.target.value)} type={"text"} />

                    <Input label={"Email"} placeholder={"email"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setEmail(e.target.value)} type={"email"} />

                    <Input label={"Senha"} placeholder={"senha"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setPassword(e.target.value)
                    } type={"password"} />

                    <Input label={"Repetir senha"} placeholder={"repita a senha"} onChange={(e: { target: { value: SetStateAction<string> } }) => {
                        setRepetPassword(e.target.value)
                    }} type={"password"} />

                    <br />

                    <div className={`relative sm:ml-[0.10em] md:ml-[6.2em] ${styles.buton}`}>
                        <Button text={"salvar"} action={criarUsuario} />
                    </div>

                    <br />
                    
                    <div>
                        já tem uma conta ? <Link href="/loginPage">clique aqui</Link>
                    </div>
                </form>
            </div>

            {alerta ? <Alert type={"sucess"} title={"Sucesso!"} Close={Closer} text={"Usuário cadastrado com sucesso!"} /> : null}
            {carregando ? <Loading /> : null}
        </>
    )
}

export default CreateUserPage