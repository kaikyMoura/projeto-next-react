import { faCartShopping, faChartPie, faX } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons/faChartLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import SideMenu from "../Menu/SideMenu";
import NavBar from "../Navbar/Navbar";
import styles from './Dashboard.module.css';

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
                <NavBar toggleSideBar={toggleSidebar} navegacao={[
                    { nome: "Home", link: "/home" }
                ]} titulo={"Dashboard"} />

                {!ativarSideMenu ?
                <button className={`flex ${styles.toggleButton}`} onClick={toggleSidebar}>
                    <FontAwesomeIcon icon={faX} color="white"/>
                </button>
                :null }

                {!ativarSideMenu ?
                    <SideMenu items={[
                        { nome: "Dashboard", link: "/dashboard", icone: faChartPie }, { nome: "Produtos", link: "/produtos", icone: faCartShopping },
                        { nome: "Venda", link: "/produtos", icone: faChartLine }, { nome: "Produtos", link: "/produtos", icone: faChartLine }
                    ]} ativarSideMenu={ativarSideMenu} />
                    : null}
            </div>

            <div className={styles.container}>

                <main>
                    {children}
                </main>

            </div>
        </>
    )
}

export default DashBoard