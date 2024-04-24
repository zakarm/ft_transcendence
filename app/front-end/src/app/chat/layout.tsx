import React from 'react';
import MainContainer from '../../components/mainContainer';

export default function ChatLayout({children}: {children: React.ReactNode})
{
    return (
        <>
            <MainContainer>
                {children}
            </MainContainer>
        </>
    );
}