import React, { useEffect, useState } from "react";
import SideMenu from "../Menu/SideMenu"
import NavBar from "../Navbar/Navbar"
import styles from './Dashboard.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons/faChartLine";

interface DashBoardProps {
    children: React.ReactNode;
}

const DashBoard: React.FC<DashBoardProps> = ({ children }) => {
    const [ativarSideMenu, setSideMenu] = useState(false)

    const toggleSidebar = () => {
        setSideMenu(!ativarSideMenu);
    };

    return (
        <>
            <div className={`${styles.dashBoard}`}>
                <NavBar ativarSideMenu={ativarSideMenu} navegacao={[
                    { nome: "Home", link: "/home" }, { nome: "Conteudo", link: "/conteudo" }
                ]} titulo={"Dashboard"} />

                <div className="">
                    <button className={`mt-5 ${styles.toggleButton} ${!ativarSideMenu ? styles.expanded : null}`} onClick={toggleSidebar}><FontAwesomeIcon icon={faBars} /></button>
                </div>

                <SideMenu items={[
                    { nome: "Dashboard", link: "/dashboard", icone: faChartLine }, { nome: "Produtos", link: "/produtos", icone: faCartShopping },
                    { nome: "Venda", link: "/produtos", icone: faChartLine }, { nome: "Produtos", link: "/produtos", icone: faChartLine }
                ]} ativarSideMenu={ativarSideMenu} />
            </div>
            <main>
                {children}
            </main>
        </>
    )
}

export default DashBoard