import React, {useEffect, useState} from 'react';
import '../styles/index.scss'
import '../../shared/styles/variables.scss';
import {Header} from "../../widgets/header";
import AppRouter from "../routes/AppRouter";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";
import {check} from "../../shared/api/userApi";
import {setAuth, setUser} from "../../entities/user/model/slise";

const App = () => {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.user)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        check()
            .then(data => {
                dispatch(setAuth(true));
                dispatch(setUser(data));
            })
            .catch(() => {
                console.log("Ошибка user");
                dispatch(setAuth(false));
                dispatch(setUser({}));
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        console.log(user)
    }, [user]);

    if (loading) {
        return <div style={{
            display: 'inline-block',
            width: '20px',
            height: '20px',
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        }}>
            <style>
                {`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}
            </style>
        </div>
    }

    return (
        <>
            <Header/>
            <AppRouter/>
        </>
    );
};

export default App;