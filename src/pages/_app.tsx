import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import '../styles/globals.css';
import LoginPage from "./loginPage";
import ComponenteTela from "./tela"

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()

  const token = typeof window !== 'undefined' ? sessionStorage.getItem('Token') : null;

  useEffect(() => {
    const renderizar = async () => {
      if (!token && router.pathname !== '/loginPage') {
        return <LoginPage />
      }
    }
    renderizar()
  }, [token, router]);


  return (
    <ComponenteTela>
      <Component {...pageProps} />
    </ComponenteTela>
  );


};

export default App;