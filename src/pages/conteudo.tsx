import Button from "@/components/Button/Button"
import Alert from "@/utils/notificacao"
import { useState } from "react"

const Conteudo = () => {

    const [alerta, setAlerta] = useState(false)

    const Closer = () => {
        setAlerta(false)
    }


    return (
        <>
            <div className="">

                Conteudodsdsd
                <Button text={""} action={() => setAlerta(true)} />
            </div>

            {alerta ? <Alert type={"sucess"} title={"Sucesso!"} text={"Usuário cadastro com sucesso"} Close={Closer} /> : null}
        </>
    )
}

export default Conteudo