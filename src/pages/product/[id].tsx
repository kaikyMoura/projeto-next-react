
import { addProductToCart, getUserCart } from "@/api/services/cartService";
import { getSingleProduct } from "@/api/services/productService";
import Loading from "@/utils/loading";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/products.module.css";
import Alert from "@/utils/notificacao";

const ProductDetails = () => {
    const router = useRouter()
    const [quantity, setQuantity] = useState(Number)
    const [product, setProduct] = useState<Product | null>(null);
    const [alerta, setAlerta] = useState(false)

    const { id } = router.query

    const Closer = () => {
        setAlerta(false)
    }

    const addToCart = async (productId: any) => {
        console.log(quantity)
        setQuantity((prevQuantity: any) => ({
            ...prevQuantity,
            [productId]: (prevQuantity[productId] || 0) + 1,
        }));
        await addProductToCart(productId, quantity)
    }

    const buyNow = async (productId: any) => {
        await addProductToCart(productId, 1)
        router.push(`/cart/${productId}`)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!id) {
                    console.log('No ID provided, returning to previous page');
                    router.back();
                    return;
                }
                const res = await getSingleProduct(id)
                console.log(res)

                console.log(await getUserCart())
                setProduct(res);
                // console.log(await getCategory("electronics"))
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };
        fetchData();


    }, [id, router])

    return (
        <>
            <div className={styles.container}>
                <div className={styles.productCard}>
                    {product && product.image ? (
                        <Image src={product.image} alt={product.title} width={200} height={200} />
                    ) : (
                        <Loading />
                    )}
                    <div className={styles.productInfo}>
                        <h1>{product?.title}</h1>
                        <p>{product?.description}</p>
                    </div>

                    <div className={`gap-3 ${styles.productSideCard}`}>
                        <span className={`text-2xl ${styles.productPrice}`}>R$ {product?.price.toFixed(2)}</span>

                        <div className={styles.buttonContainer}>
                            <button className={`flex ${styles.buyNowButton}`} onClick={() => buyNow(product?.id)}>
                                <p className="font-semibold">comprar agora</p>
                                <FontAwesomeIcon className="ml-1 mt-1" icon={faCartShopping} height={20} color="white" />
                            </button>
                            <button className={`flex mt-2 ${styles.addToCartButton}`} onClick={() => addToCart(product?.id)
                            }>
                                <p className="font-semibold">adicionar ao carrinho</p>
                                <FontAwesomeIcon className="ml-1 mt-1" icon={faCartShopping} height={20} color="white" />
                            </button>
                        </div>
                    </div>
                </div>

            </div>

            {alerta ? <Alert type={"sucess"} title={"Sucesso!"} text={"Produto adicionado no carrinho!"} Close={Closer} action={() => router.push('/cart')}/> : null}
        </>
    )
}

export default ProductDetails;