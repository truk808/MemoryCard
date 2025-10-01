import {DICTIONARY_ROUTES, MAIN_ROUTES, SOCIETY_ROUTES} from "../../../shared";

export type NavItem = {
    href: string;
    name: string;
}

export const NavItems: NavItem[] = [
    {
        href: MAIN_ROUTES,
        name: 'Главная',
    },
    {
        href: SOCIETY_ROUTES,
        name: 'Сообщество',
    },
    {
        href: DICTIONARY_ROUTES,
        name: 'Словарь',
    },
]