import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './sidemenu.module.css'

interface SideMenuProps {
    items: { nome: string, link: string, icone: Object }[]
    ativarSideMenu: Boolean
    logo: string
}

const SideMenu = ({ logo, items, ativarSideMenu }: SideMenuProps) => {

    const router = useRouter()

    const Logout = async () => {
        sessionStorage.removeItem('Token')
        router.push('/')
    }

    return (
        <>
            <div className={`${styles.sideContainer}`}>
                <div className={`${styles.sidemenu} ${!ativarSideMenu ? styles.expanded : styles.collapsed}`}>
                    <h3 className={`mt-2 ml-4 text-2xl`}>{logo}</h3>
                    <ul className={`mt-2 ${styles.menuItems}`}>
                        {items?.map((item) => (
                            <>
                                <li className={`mt-2`}>
                                    <i></i>
                                    <Link className={`${styles.item}`} href={item.link}>
                                        {item.nome}
                                    </Link>
                                </li>
                            </>
                        ))}
                        <li className={`absolute bottom-2`}>
                            <button onClick={Logout}>Sair</button>
                        </li>
                    </ul>

                </div>
            </div>
        </>
    )
}

export default SideMenu;
