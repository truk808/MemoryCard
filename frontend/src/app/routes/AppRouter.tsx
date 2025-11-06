import React from 'react';
import {routes} from "./Routes";
import {Route, Routes} from "react-router-dom";

const AppRouter = () => {
    return (
        <div className='container'>
            <Routes>
                {routes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}/>
                )}
            </Routes>
        </div>
    );
};

export default AppRouter;