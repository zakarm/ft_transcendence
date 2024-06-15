import React from 'react';
import styles from './styles/NotFound.module.css';

export default function NotFound() {
    return (
        <div className={styles.notFoundContainer}>
            <h1 className={`valo-font ${styles.notFound404}`}>404</h1>
            <h2 className={`valo-font ${styles.notFoundTitle}`}>FT_TRANSCENDENCE</h2>
            <div className={styles.codeAnimation}>
                <p>{`<Page>`}</p>
                <p>{`<NotFound />`}</p>
                <p>{`</Page>`}</p>
            </div>
        </div>
    );
}
