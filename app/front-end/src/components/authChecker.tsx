'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Spinner from 'react-bootstrap/Spinner';
import styles from './styles/authChecker.module.css';
import MainContainer from './mainContainer';

const AuthChecker = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const authentication = async () => {
            try {
                const access = Cookies.get('access');
                const csrftoken = Cookies.get('csrftoken') || '';
                if (access) {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/verify`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRFToken': csrftoken,
                        },
                        body: JSON.stringify({ token: access }),
                    });
                    if (response.ok) {
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                        router.push('/sign-in');
                    }
                } else {
                    setIsAuthenticated(false);
                    router.push('/sign-in');
                }
            } catch (error: any) {
                console.error('Error verifying token:', error);
            }
        };
        authentication();
    }, []);

    if (isAuthenticated === null) {
        return (
            <MainContainer>
                <div className={`${styles.spinnerContainer}`}>
                    <Spinner animation="border" variant="danger" />
                    <p className={`${styles.loadingMessage} valo-font`}>LOADING ...</p>
                </div>
            </MainContainer>

        );
    }

    return isAuthenticated ? <>{children}</> : null;
};

export default AuthChecker;
