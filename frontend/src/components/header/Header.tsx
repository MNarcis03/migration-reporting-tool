import React, { FC } from 'react';
import { ReactComponent as Logo } from './logo.svg';
import styles from './Header.module.scss';
import { useNavigate, useNavigation } from 'react-router-dom';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

    // const navigate = useNavigate();

    const goToStatistics = () => {
        // navigate('/statistics');
    }

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Logo className={styles.logo} />
            </div>
            <div className={styles.menu}>
                <a href="/statistics" onClick={ goToStatistics }>
                    <div>
                        <span>
                            Statistics
                        </span>
                    </div>
                </a>
                <a href="/map">
                    <div>
                        <span>
                            Map
                        </span>
                    </div>
                </a>
            </div>
            <div className={styles.settings}></div>
        </header>
    )
};

export default Header;
