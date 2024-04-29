"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Spinner from 'react-bootstrap/Spinner'
import styles from './styles/authChecker.module.css'


const AuthChecker = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const authentication = async () => {
            const access = Cookies.get('access');
			// console.log(access)
            if (access) {
                const response = await fetch('http://localhost:8000/api/verify', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ token: access })
                });
                if (response.ok) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                    router.push('/sign-in');
                }
            }
            else
            {
                setIsAuthenticated(false);
                router.push('/sign-in');
            }
        };
        authentication();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className={`${styles.spinnerContainer} ${styles.darkBackground}`}>
                <Spinner animation="border" variant="danger" />
                <p className={`${styles.loadingMessage} valo-font`}>LOADING ...</p>
            </div>
        );
    }

    return isAuthenticated ? <>{children}</> : null;
};

export default AuthChecker;
