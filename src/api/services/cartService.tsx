import axios from "axios";
import { getUser } from "./serviceUser";

export const getUserCart = async (): Promise<Cart | any> => {
    try {
        const userId = (await getUser(sessionStorage.getItem('UserEmail'))).id
        const res = await axios.get(`https://fakestoreapi.com/carts/user/${userId}`);
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
};

export const addProductToCart = async (productId: number, quantity: number) => {
    try {
        const res = await axios.post(`https://fakestoreapi.com/carts`, {
            body: JSON.stringify(
                {
                    userId: (await getUser(sessionStorage.getItem('UserEmail'))).id,
                    date: new Date().toLocaleDateString('pt-br'),
                    products: [
                        { productId: productId, quantity: quantity }
                    ]
                }
            )
        })
        return await res.data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
};
