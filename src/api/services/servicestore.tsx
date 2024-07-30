import axios from "axios";

export const getAllProducts = async () => {
    try {
        const res = await axios.get("https://fakestoreapi.com/products");
        return res.data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
};

export const getSingleProduct = async (numero: any) => {
    try {
        const res = await axios.get(`https://fakestoreapi.com/products/${numero}`)
        return await res.data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
};


export const getCategories = async () => {
    try {
        const res = await axios.get("https://fakestoreapi.com/products/categories")
        return await res.data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
};

export const getCategory = async (category: string) => {
    try {
        const res = await axios.get(`https://fakestoreapi.com/products/category/${category}`)
        return await res.data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
    }
};