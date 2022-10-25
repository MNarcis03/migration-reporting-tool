import React, { FC } from 'react';
import { ReactComponent as Logo } from './logo.svg';
import styles from './Header.module.scss';

interface HeaderProps { }

const Header: FC<HeaderProps> = () => (
    <header className={styles.header}>
        <Logo className={styles.logo} />
    </header>
);

export default Header;
