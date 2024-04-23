
import MainContainer from '../../components/mainContainer';
import React from 'react';

export default function ProfileLayout({children}: {children: React.ReactNode})
{
    return (
        <>
            <MainContainer>
                {children}
            </MainContainer>
        </>
    );
}