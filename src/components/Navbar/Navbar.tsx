import SearchInput from "@/utils/searchInput"
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"
import { useRouter } from "next/router"
import styles from './navbar.module.css'

interface NavBarProps {
    navegacao?: { nome: string, link: string }[]
    sidebarActive?: Boolean
    toggleSideBar: () => void,
    titulo: string
}

const NavBar = ({ titulo, navegacao, sidebarActive, toggleSideBar }: NavBarProps) => {
    const router = useRouter()

    // const buyNow = async (productId: any) => {
    //     await getUserCart()
    //     router.push(`/cart/${productId}`)
    // }

    return (<>
        <div className={`${styles.navbar} ${sidebarActive ? styles.expanded : styles.collapsed}`}>
            <div className={`flex gap-8 ${styles.navItems}`}>
                <Link href={"/home"}><h2 className={`text-2xl`}>{titulo}</h2></Link>
                <div className="ml-[50%]">
                    <SearchInput />
                </div>
                <div className="relative ml-[95%]">
                    <button className="flex gap-1" onClick={() => router.push(`/cart`)}>
                        <FontAwesomeIcon className="text-3xl" icon={faCartShopping} color="white" />
                        <p className="text-white text-medium mt-1">Carrinho</p>
                        1
                    </button>
                </div>
            </div>

            <div className={`${styles.navMain}`}>
                <ul className={`flex space-x-8`}>
                    <li>
                        <button className={`flex ${styles.toggleButton} ${!toggleSideBar ? styles.expanded : null}`} onClick={toggleSideBar}>
                            <FontAwesomeIcon icon={faBars} />
                            <p className="ml-2">Mais</p>
                        </button>
                    </li>
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
            </div>
        </div>
    </>)
}

export default NavBar