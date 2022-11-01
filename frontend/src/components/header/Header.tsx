import React, { FC } from 'react';
import { ReactComponent as Logo } from './logo.svg';
import styles from './Header.module.scss';
import { Link, useNavigate, useNavigation } from 'react-router-dom';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

    const navigate = useNavigate();

    const goToStatistics = () => {
        navigate('/statistics');
    }

    const goToMap = () => {
        navigate('/map');
    }

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Logo className={styles.logo} />
            </div>
            <div className={styles.menu}>
                <a onClick={ goToStatistics }>
                    <div>
                        <span>
                            Statistics
                        </span>
                    </div>
                </a>
                <a onClick={ goToMap }>
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
