import styles from './Header.module.scss';
import { useSelector } from 'react-redux';
import { NavBar } from '../../navigation';
import { Notification } from '../../../features/notifications';
import { ToggleThemeButton } from '../../../features/toggleTheme';
import { LogoutButton } from '../../../features/logout';
import { selectIsAuth } from '../../../features/auth';
import { Logo } from '../../../shared/ui';
import { useIsAuthPage } from '../../../shared/lib/router';

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
                    <Logo />

                    <input
                        id="burger-toggle"
                        type="checkbox"
                        className={styles.burgerToggle}
                    />

                    <label htmlFor="burger-toggle" className={styles.burger}>
                        <span />
                    </label>

                    <div className={styles.headerItems}>
                        <NavBar />

                        <div className={styles.headerAdditional}>
                            <ToggleThemeButton />
                            <Notification />
                            <LogoutButton />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
