import React, {FC} from 'react'
import styles from './Auth.module.scss'
import {useAuth} from "../model/useAuth";
import {NavLink} from "react-router-dom";
import {Button, Input} from "../../../shared/ui";
import {LOGIN_ROUTE, REGISTRATION_ROUTE} from "../../../shared/routes/const";

interface AuthProps {
    isLogin: boolean
}

export const Auth: FC<AuthProps> = ({isLogin}) => {
    const {
        email,
        password,
        nickname,
        setEmail,
        setPassword,
        setNickname,
        loading,
        error,
        click,
    } = useAuth(isLogin)

    return (
        <div className={styles.auth}>
            <div className={styles.form}>
                <h1 className={styles.title}>{isLogin ? "Авторизация" : "Регистрация"}</h1>
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input
                    placeholder="Пароль"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                {!isLogin && (
                    <Input
                        placeholder="Никнейм"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                    />
                )}

                <div className={styles.buttons}>
                    <NavLink to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}>
                        <Button color="blue" onClick={() => {
                        }}>
                            {isLogin ? 'Зарегистрироваться' : 'Войти'}
                        </Button>
                    </NavLink>

                    <Button
                        onClick={() => click()}
                        color="blue">
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </Button>

                </div>
            </div>
        </div>
    )
}
