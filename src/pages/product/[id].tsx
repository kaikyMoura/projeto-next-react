
import { getSingleProduct } from "@/api/services/servicestore";
import styles from "../../styles/products.module.css"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/utils/loading";

const ProductDetails = () => {
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null);

    const { id } = router.query



    useEffect(() => {
        console.log(id)
        const fetchData = async () => {
            try {
                if (!id) {
                    console.log('No ID provided, returning to previous page');
                    router.back();
                    return;
                }
                const res = await getSingleProduct(id)
                console.log(res)
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
                        <span>R$ {product?.price.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetails;