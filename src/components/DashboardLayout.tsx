'use client';

import React from 'react';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="w-full flex-1 flex bg-[#F8FAFC] dark:bg-[#090D16] transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full flex-1 flex">
        <Sidebar />
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
