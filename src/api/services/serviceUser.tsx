import UserLoginProps from "../../model/UserLogin";
import api from "../Api";


export const userLogin = async (usuario: UserLoginProps) => {
    return await api.post('/users/login', usuario).then((response) => {
        return sessionStorage.setItem('Token', response.data.token)
    });
}

export const createUser = (usuario: unknown): Promise<unknown> => {
    return api.post('/users', usuario)
}