import {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, RootState} from "../../../app/store";
import {login, registration} from "../../../shared/api/userApi";
import {setAuth} from "../../../entities/user/model/slise";
import {MAIN_ROUTES} from "../../../shared";
import {replace, useNavigate} from "react-router-dom";
// import { login, registration } from '@/shared/api/auth'
// import { setUser } from '@/entities/user'

export const useAuth = (isLogin: boolean) => {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.user)
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [nickname, setNickname] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const click = async () => {
        try {
            if (isLogin) {
                const response = await login(email, password)
            } else {
                const response = await registration(email, password, nickname)
            }
            dispatch(setAuth(true))
            // dispatch(setAuth(true))
            navigate(MAIN_ROUTES, {replace: true})
            window.location.href = window.location.href;
            // window.location.replace(MAIN_ROUTES)
        } catch (e) {
            alert(e)
        }

    }


    return {
        email,
        password,
        nickname,
        setEmail,
        setPassword,
        setNickname,
        loading,
        error,
        click,
    }
}
