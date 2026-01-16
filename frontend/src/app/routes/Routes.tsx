import {AuthPage, DictionaryPage, GroupPage, MainPage, ModulePage, SocietyPage, TrainingPage} from "../../pages";
import {
    DICTIONARY_ROUTES,
    GROUP_ROUTE, LOGIN_ROUTE,
    MAIN_ROUTES,
    MODULE_ROUTE,
    PROFILE_ROUTE, REGISTRATION_ROUTE,
    SOCIETY_ROUTES,
    TRAINING_ROUTE
} from "../../shared/routes/const";
import ProfilePage from "../../pages/profilePage/ui/ProfilePage";

export const authRoutes = [
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
        path: `${GROUP_ROUTE}/:id`,
        element: <GroupPage/>,
    },
    {
        path: `${MODULE_ROUTE}/:id`,
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
    {
        path: `${TRAINING_ROUTE}`,
        element: <TrainingPage/>,
    },
    {
        path: `${PROFILE_ROUTE}`,
        element: <ProfilePage/>,
    },
]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        element: <AuthPage/>,
    },
    {
        path: REGISTRATION_ROUTE,
        element: <AuthPage/>,
    },
]