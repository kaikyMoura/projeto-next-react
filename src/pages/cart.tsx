import { getUserCart } from "@/api/services/cartService"
import { getSingleProduct } from "@/api/services/productService"
import Alert from "@/utils/notificacao"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from '../styles/carts.module.css'
import Link from "next/link"
import Loading from "@/utils/loading"

const CartDetails = () => {
    const router = useRouter()
    const [alerta, setAlerta] = useState(false)
    const [quantity, setQuantity] = useState(Number)
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Cart>();

    const { id } = router.query

    const Closer = () => {
        setAlerta(false)
    }

    const addToCart = (productId: any) => {
        console.log(quantity)
        setQuantity((prevQuantity: any) => ({
            ...prevQuantity,
            [productId]: (prevQuantity[productId] || 0) + 1,
        }));
        //addProductToCart(productId, quantity)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUserCart()
                setCart(res)

                if (!cart || !cart.products) {
                    setProducts([]);
                    return;
                }

                const productsDetails = await Promise.all(
                    cart.products.map(async (cartProduct: any) => {
                        const product: Product = await getSingleProduct(cartProduct.productId);
                        return { ...product, quantity: cartProduct.quantity };
                    }) || []
                )

                setProducts(productsDetails)

            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };
        fetchData();


    }, [cart, id, router])

    return (
        <>
            <section className={styles.cartSection}>
                <h2>Seu Carrinho</h2>
                {products.length > 0 ? (
                    <div className={styles.cartGrid}>
                        {products.map(product => (
                            <div key={product.id} className={styles.cartCard}>
                                <Link href={`/product/${product.id}`}>
                                    {product.image ? (
                                        <image href={product.image} width={200} height={200} />
                                    ) : (
                                        <Loading />
                                    )}
                                </Link>
                                <div className={styles.cartDetails}>
                                    <h3>{product.title}</h3>
                                    <p>Quantidade: {product.quantity}</p>
                                    <p>Preço unitário: R$ {product.price.toFixed(2)}</p>
                                    <p>Total: R$ {(product.price * product.quantity).toFixed(2)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Seu carrinho está vazio.</p>
                )}

                <div className={styles.cartTotal}>
                    {/* Calcula o total do carrinho */}
                    <h3>Total do Carrinho: R$ {products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2)}</h3>
                    <button className={styles.checkoutButton}>Finalizar Compra</button>
                </div>
            </section>
            {alerta ? <Alert type={"sucess"} title={"Sucesso!"} text={"Usuário cadastro com sucesso"} Close={Closer} /> : null}
        </>
    )
}

export default CartDetails;