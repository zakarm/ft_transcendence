'use client';
import MainContainer from '../../components/mainContainer';
import AuthChecker from '../../components/authChecker';
import React from 'react';
import { WebSocketProvider } from '@/components/webSocket';

export default function GameLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthChecker>
            <WebSocketProvider>
                <MainContainer>{children}</MainContainer>
            </WebSocketProvider>
        </AuthChecker>
    );
}
