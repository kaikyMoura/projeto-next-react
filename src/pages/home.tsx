import { getAllProducts, getCategories, getCategory, getProductsWithLimit } from '@/api/services/productService';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/homePage.module.css';
import Image from 'next/image';

const Home = () => {

    const [products, setProducts] = useState<Product[]>()
    const [productsCategory, setProductsCategory] = useState<Product[]>()
    const [categories, setCategories] = useState<[]>()
    //const router = useRouter()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getProductsWithLimit(4)
                setProducts(res);
                setCategories(await getCategories())
                setProductsCategory(await getCategory('electronics'))
                // console.log(await getCategory("electronics"))
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchData();


    }, [])

    return (
        <>
            <div className={styles.container}>
                {/* <section className={styles.banner}>
                    <div className={styles.bannerText}>
                        <h1>Bem-vindo à Nossa Loja!</h1>
                        <p>Ofertas imperdíveis e novos produtos para você!</p>
                    </div>
                </section> */}

                <section className={styles.featuredProducts}>
                    <h2>Produtos em Destaque</h2>
                    <div className={styles.productGrid}>
                        {products?.map(product => (
                            <>
                                <div key={product.id} className={styles.productCard}>
                                    <Link href={`/product/${product.id}`}>
                                        <Image className={`${styles.image}`} src={product.image} alt={product.title} width={200} height={200} />
                                        <h3>{product.title}</h3>
                                        <span>R$ {product.price.toFixed(2)}</span>
                                    </Link>
                                </div>
                            </>
                        ))}
                    </div>
                </section>

                <section className={styles.featuredProducts}>
                    <h2>Destaques em tecnologia</h2>
                    <div className={styles.productGrid}>
                        {productsCategory?.slice(0, 5).map(product => (
                            <>
                                <div key={product.id} className={styles.productCard}>
                                    <Link href={`/product/${product.id}`}>
                                        <Image className={`${styles.image}`} src={product.image} alt={product.title} width={200} height={200} />
                                        <h3>{product.title}</h3>
                                        <span>R$ {product.price.toFixed(2)}</span>
                                    </Link>
                                </div>
                            </>
                        ))}
                    </div>
                </section>

                <section className={styles.categories}>
                    <h2>Categorias</h2>
                    <div className={styles.categoryGrid}>
                        <div className={styles.categoryCard}>
                            {categories?.map(category => (
                                <div key={category} className={styles.productCard}>
                                    <h3>{category}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={styles.specialOffers}>
                    <h2>Ofertas Especiais</h2>
                    <div className={styles.offerGrid}>
                        <div className={styles.offerCard}>
                            <h3>Oferta 1</h3>
                            <p>Detalhes da oferta.</p>
                        </div>
                        <div className={styles.offerCard}>
                            <h3>Oferta 2</h3>
                            <p>Detalhes da oferta.</p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Home;