import React from 'react';
import MainContainer from '../../components/mainContainer';
import AuthChecker from '../../components/authChecker';
import { WebSocketProvider } from '@/components/webSocket';

function StatisticsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthChecker>
      <WebSocketProvider>
        <MainContainer>{children}</MainContainer>
      </WebSocketProvider>
    </AuthChecker>
  );
}

export default StatisticsLayout;
