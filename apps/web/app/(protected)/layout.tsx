'use client';

import { SidebarProvider } from '@ultra-reporter/ui/components/sidebar';
import { AppSidebar } from '@ultra-reporter/ui/dashboard/app-sidebar';
import { ComingSoon } from '@ultra-reporter/ui/dashboard/coming-soon';
import { Navbar } from '@ultra-reporter/ui/dashboard/navbar';
import { useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [selectedOrg, setSelectedOrg] = useState('Acme Corp');
  const [selectedTeam, setSelectedTeam] = useState('Engineering');
  const [selectedProject, setSelectedProject] = useState('Project Alpha');
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);

  const getMenuTitle = (menuId: string): string => {
    const menuTitles: Record<string, string> = {
      home: 'Home',
      'upload-report': 'Upload Report',
      'view-reports': 'View Reports',
      'create-custom-report': 'Create Custom Report',
      profile: 'Profile',
      preferences: 'Preferences',
      billing: 'Billing',
      help: 'Help & Support',
      logout: 'Logout',
    };
    return menuTitles[menuId] || 'Coming Soon';
  };

  return (
    <SidebarProvider>
      <div className='flex h-screen w-full bg-background'>
        <AppSidebar onMenuClick={setSelectedMenu} />
        <div className='flex flex-col flex-1 overflow-hidden'>
          <Navbar
            selectedOrg={selectedOrg}
            selectedTeam={selectedTeam}
            selectedProject={selectedProject}
            onOrgChange={setSelectedOrg}
            onTeamChange={setSelectedTeam}
            onProjectChange={setSelectedProject}
          />
          {selectedMenu ? (
            <ComingSoon title={getMenuTitle(selectedMenu)} onBack={() => setSelectedMenu(null)} />
          ) : (
            children
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}
