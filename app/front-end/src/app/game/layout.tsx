'use client'
import MainContainer from "../../components/mainContainer";
import AuthChecker from "../../components/authChecker"
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
      <AuthChecker>
        <MainContainer>
          {children}
        </MainContainer>
      </AuthChecker>
  );
}