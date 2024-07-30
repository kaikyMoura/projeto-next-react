import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './sidemenu.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import IUser from '@/model/IUser'
import { useEffect, useState } from 'react'
import { getUser } from '@/api/services/serviceUser'

interface SideMenuProps {
    items: { nome: string, link: string, icone: IconProp }[]
    ativarSideMenu: Boolean,
}

const SideMenu = ({ items, ativarSideMenu }: SideMenuProps) => {

    const [perfil, setPerfil] = useState<IUser>()
    const router = useRouter()

    const Logout = async () => {
        sessionStorage.removeItem('Token')
        router.push('/')
    }

    useEffect(() => {
        const setUser = async () => {
            const email = typeof window !== 'undefined' ? sessionStorage.getItem('UserEmail') : null;
            const user = await getUser(email)
            setPerfil(user)
        }
        setUser()
    }, [])

    return (
        <>
            <div className={styles.sideContainer}>
                <div className={`${styles.sidemenu} ${!ativarSideMenu ? styles.expanded : styles.collapsed}`}>
                    <div className={`flex ${styles.profile} ${ativarSideMenu ? styles.expanded : styles.collapsed}`}>
                        <FontAwesomeIcon className={`${styles.profileIcon}`} icon={faCircleUser} />
                        {/* <Image width={2} height={2} src={'/'} alt='Usuário'/> */}
                        {!ativarSideMenu ?
                            <h3 className={`ml-4 text-1xl`}>Olá, {perfil?.name}</h3>
                            : null}
                    </div>
                    <ul className={`mt-2 ${styles.menuItems}`}>
                        {items?.map((item) => (
                            <>
                                <li className={`mt-2`}>
                                    <Link className={`flex justify-between ${styles.item}`} href={item.link}>
                                        {!ativarSideMenu ? <p className='text-lg font-medium'>{item.nome}</p> : null}
                                        <i className={`mr-2 ${styles.listIcon} ${ativarSideMenu ? styles.collapsed : null}`}>
                                            <FontAwesomeIcon icon={item.icone} />
                                        </i>
                                    </Link>
                                </li>
                            </>
                        ))}
                        <button className={`absolute bottom-2`}>
                            <div className={`flex justify-between  ${styles.item}`}>
                                {!ativarSideMenu ? <button onClick={Logout}><p className='text-md font-medium'>Sair</p></button> : null}
                                <i className={`${styles.listIcon} ${ativarSideMenu ? styles.collapsed : styles.expanded}`}>
                                    <FontAwesomeIcon className='ml-1' icon={faRightFromBracket} />
                                </i>
                            </div>
                        </button>
                    </ul>

                </div>
            </div>
        </>
    )
}

export default SideMenu;
