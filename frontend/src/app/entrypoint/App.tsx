import React, {ReactElement} from 'react';
import '../styles/index.scss'
import '../../shared/styles/variables.scss';
import {Header} from "../../widgets/header";
import AppRouter from "../routes/AppRouter";

interface AppRoute {
    path: string;
    element: ReactElement;
}

const App = () => {
    return (
        <>
            <Header/>
            <AppRouter/>
        </>
    );
};

export default App;