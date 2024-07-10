'use client';
import MainContainer from '../../components/mainContainer';
import AuthChecker from '../../components/authChecker';
import { WebSocketProvider } from '@/components/webSocket';
import React, { useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthChecker>
      <WebSocketProvider>
        <MainContainer>{children}</MainContainer>
      </WebSocketProvider>
    </AuthChecker>
  );
}
