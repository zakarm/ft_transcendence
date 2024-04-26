import React from 'react';
import MainContainer from '../../components/mainContainer';
import AuthChecker from "../../components/authChecker";

export default function ChatLayout({children}: {children: React.ReactNode})
{
    return (
        <AuthChecker>
            <MainContainer>
                {children}
            </MainContainer>
        </AuthChecker>
    );
}