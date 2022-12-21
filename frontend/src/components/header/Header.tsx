import React, { FC, useState } from 'react';
import { ReactComponent as Logo } from './logo.svg';
import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {

    const navigate = useNavigate();
    const [route, setRoute] = useState('map');

    const goToStatistics = () => {
        navigate('/statistics');
        setRoute('statistics');
    }

    const goToMap = () => {
        navigate('/map');
        setRoute('map');
    }

    return (
        <header className={styles.header}>
            <div className={styles.logoContainer}>
                <Logo className={styles.logo} />
            </div>
            <div className={styles.menu}>
                <button onClick={ goToStatistics }>
                    <div>
                        <span className={ route === 'statistics' ? styles.active : '' }>
                            Statistics
                        </span>
                    </div>
                </button>
                <button onClick={ goToMap }>
                    <div>
                        <span className={ route === 'map' ? styles.active : '' }>
                            Map
                        </span>
                    </div>
                </button>
            </div>
            <div className={styles.settings}></div>
        </header>
    );
};

export default Header;
