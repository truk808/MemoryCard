import {$host, $authHost} from "./axios"
import { jwtDecode } from 'jwt-decode';

export async function registration(email: string, password: string, nickname: string) {
    const {data} = await $host.post(
        '/api/user/registration',
        {email, password, nickname,  role: 'ADMIN'}
    )
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token);
}

export async function login(email: string, password: string) {
    const {data} = await $host.post(
        '/api/user/login',
        {email, password}
    )
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token);
}

export async function check() {
    const {data} = await $authHost.get(
        '/api/user/auth',
    )
    localStorage.setItem("token", data.token)
    return jwtDecode(data.token);
}