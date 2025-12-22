import React from 'react';
import {GlobalSvgSelector} from "../../../shared";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../app/store";
import {setAuth, setUser} from "../../../entities/user/model/slise";



export const Profile = () => {
    const dispatch = useDispatch<AppDispatch>()
    const user = useSelector((state: RootState) => state.user)

    function logOut() {
        dispatch(setUser({}))
        dispatch(setAuth(false))
        localStorage.removeItem("token");
    }

    return (
        <div
            onClick={logOut}
            style={{cursor: 'pointer'}}
        >
            <GlobalSvgSelector svgName={'profile'}/>
        </div>
    );
};
