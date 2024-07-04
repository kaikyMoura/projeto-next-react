import { SetStateAction, useState } from "react";
import { userLogin } from "../api/services/serviceUser";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import UserLoginProps from "../model/UserLogin";
import styles from "../styles/loginpage.module.css";
import { useRouter } from "next/router";
import Link from "next/link";

const LoginPage = () => {

    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const login = async () => {
        const usuario: UserLoginProps = {
            email: email,
            password: password
        }
        await userLogin(usuario).then(()=>{
            router.push("/home")
        })
    }

    return (
        <>
            <div className={`${styles.container}`}>
                <form className={`${styles.formContainer}`}>
                    <h2>Login</h2>
                    <Input label={"Email"} placeholder={"email"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setEmail(e.target.value)} type={"email"} />
                    <Input label={"Senha"} placeholder={"senha"} onChange={(e: { target: { value: SetStateAction<string> } }) =>
                        setPassword(e.target.value)
                    } type={"password"} />
                    <br />
                    <div className={`relative sm:ml-[0.10em] md:ml-[6.2em] ${styles.buton}`}>
                        <Button text={"salvar"} action={login}/>
                    </div>
                    <br />
                    <div>
                        Não tem uma conta ? <Link href="/createUserPage">clique aqui</Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginPage;