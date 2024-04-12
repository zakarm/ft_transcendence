'use client'
import MainContainer from "../../components/mainContainer";
import React, { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MainContainer>
        {children}
      </MainContainer>
    </>
  );
}