import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import {NavBar} from "../../navigation";
import {Notification} from '../../../features/notifications';
import {ToggleThemeButton} from "../../../features/toggleTheme";
import {LogoutButton} from "../../../features/logout";
import {selectIsAuth} from "../../../features/auth";
import {useIsAuthPage} from "../../../shared/lib/router";
import {Logo} from "../../../shared/ui";

export const Header = () => {
    const isAuth = useSelector(selectIsAuth);
    const isAuthPage = useIsAuthPage();

    if (!isAuth || isAuthPage) {
        return null;
    }

    return (
        <header className={styles.header}>
            <div className={`container ${styles.header__inner}`}>
                <div className={styles.header__left}>
                    <Logo/>
                    <NavBar/>
                </div>
                <div className={styles.header__right}>
                    <ToggleThemeButton/>
                    <Notification/>
                    <LogoutButton/>
                </div>
            </div>
        </header>

    );
};
