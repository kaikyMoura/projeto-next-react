import DashBoard from "../components/Dashboard/Dashboard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoginPage from "./loginPage";

const ComponenteTela: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuthentication = () => {
            if (typeof window !== 'undefined') {
                const token = sessionStorage.getItem('Token');
                if (!token) {
                    setIsAuthenticated(false);
                    if (router.pathname !== '/loginPage' && router.pathname !== '/createUserPage') {
                        router.push('/loginPage');
                    }
                } else {
                    setIsAuthenticated(true);
                    if (router.pathname === '/') {
                        router.push('/home');
                    }
                }
            }
        };

        checkAuthentication();
    }, [router]);

    if (!isAuthenticated) {
        return <LoginPage />
    }

    // Se houver um token, renderize os filhos (componentes aninhados) dentro de uma rota
    return (
        <DashBoard>
            {children}
        </DashBoard>
    )
};

export default ComponenteTela;