import React, {useEffect, useState} from 'react';
import {AppDispatch, RootState} from "../store";
import {useDispatch, useSelector} from "react-redux";
import '../styles/index.scss'
import '../../shared/styles/variables.scss';
import {Header} from "../../widgets/header";
import {setAuth, setUser} from "../../entities/user";
import {setGroups} from "../../entities/group";
import {setGroupModules} from "../../entities/groupModule";
import {setModules} from "../../entities/module";
import {setModuleCards} from "../../entities/moduleCard";
import {setCards} from "../../entities/card";
import {setCardTags} from "../../entities/cardTag";
import {setTags} from "../../entities/tag";
import {bootstrapUserData, check} from "../../shared/api";

const App = () => {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.user)
    const {isAuth} = useSelector((state: RootState) => state.user);
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
        if (!isAuth) return;
        bootstrapUserData().then(data => {
            dispatch(setGroups(data.groups));
            dispatch(setModules(data.modules));
            dispatch(setCards(data.cards));
            dispatch(setTags(data.tags));

            dispatch(setGroupModules(data.groupModules));
            dispatch(setModuleCards(data.moduleCards));
            dispatch(setCardTags(data.cardTags));
            console.log('bootstrap', data)
        });
    }, [isAuth]);

    useEffect(() => {
        console.log('user', user)
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
            {/*<div className="container">*/}
            {/*    <AppRouter/>*/}
            {/*</div>*/}

        </>
    );
};

export default App;