import {MainPage, SocietyPage, DictionaryPage} from "../../pages/index";
import GroupPage from "../../pages/groupPage";
import ModulePage from "../../pages/modulePage";
import {DICTIONARY_ROUTES, GROUP_ROUTE, MAIN_ROUTES, MODULE_ROUTE, SOCIETY_ROUTES} from "../../shared/routes/const";

export const routes = [
    {
        path: MAIN_ROUTES,
        element: <MainPage/>,
    },
    {
        path: SOCIETY_ROUTES,
        element: <SocietyPage/>,
    },
    {
        path: DICTIONARY_ROUTES,
        element: <DictionaryPage/>,
    },
    {
        path: GROUP_ROUTE,
        element: <GroupPage/>,
    },
    {
        path: MODULE_ROUTE,
        element: <ModulePage/>,
    },
    {
        path: DICTIONARY_ROUTES,
        element: <DictionaryPage/>,
    },
    {
        path: SOCIETY_ROUTES,
        element: <SocietyPage/>,
    },
]