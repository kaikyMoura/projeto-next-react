import Link from "next/link"
import styles from './navbar.module.css'
import { useRouter } from "next/router"
import SearchInput from "@/utils/searchInput"

interface NavBarProps {
    //link: string
    navegacao: { nome: string, link: string }[]
    ativarSideMenu?: Boolean
    titulo: string
    logo?: string
}

const NavBar = ({ titulo, navegacao, ativarSideMenu }: NavBarProps) => {

    const router = useRouter()

    return (<>
        <div className={`${styles.navbar} ${ativarSideMenu ? styles.expanded : styles.collapsed}`}>
            <div className={`flex gap-8 ${styles.navItems}`}>
                <h2 className={`text-2xl`}>{titulo}</h2>
                <ul className={`flex space-x-8`}>
                    {navegacao?.map((item) => (
                        <>
                            <li className={`text-lg`}>
                                <Link href={item.link}>
                                    {item.nome}
                                </Link>

                                {router.pathname === item.link && (
                                    <div className={`relative ${styles.retangle}`}></div>
                                )}
                            </li>
                        </>
                    ))}

                </ul>
                <div className={`flex justify-center ${styles.searchInput}`}>
                    <SearchInput />
                </div>
            </div>
        </div >
    </>)
}

export default NavBar