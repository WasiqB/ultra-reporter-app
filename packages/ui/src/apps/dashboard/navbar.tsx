'use client';

import { Button } from '../../components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/dropdown-menu';
import { ChevronDown } from 'lucide-react';

interface NavbarProps {
  selectedOrg: string;
  selectedTeam: string;
  selectedProject: string;
  onOrgChange: (org: string) => void;
  onTeamChange: (team: string) => void;
  onProjectChange: (project: string) => void;
}

export function Navbar({
  selectedOrg,
  selectedTeam,
  selectedProject,
  onOrgChange,
  onTeamChange,
  onProjectChange,
}: NavbarProps) {
  const organisations = [
    { id: 'acme', name: 'Acme Corp', initials: 'AC' },
    { id: 'tech', name: 'Tech Innovations', initials: 'TI' },
    { id: 'global', name: 'Global Solutions', initials: 'GS' },
  ];

  const teams = [
    { id: 'eng', name: 'Engineering' },
    { id: 'product', name: 'Product' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' },
  ];

  const projects = [
    { id: 'alpha', name: 'Project Alpha' },
    { id: 'beta', name: 'Project Beta' },
    { id: 'gamma', name: 'Project Gamma' },
    { id: 'delta', name: 'Project Delta' },
  ];

  return (
    <nav className='flex items-center gap-2 px-6 py-4 bg-background border-b border-border h-16'>
      {/* Organisation Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='flex items-center gap-2 text-foreground hover:bg-accent'>
            <span className='font-medium'>{selectedOrg}</span>
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          {organisations.map((org) => (
            <DropdownMenuItem key={org.id} onClick={() => onOrgChange(org.name)}>
              <div className='flex items-center gap-2'>
                <div className='w-6 h-6 rounded bg-primary flex items-center justify-center text-primary-foreground text-xs font-semibold'>
                  {org.initials}
                </div>
                <span>{org.name}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Breadcrumb Separator */}
      <span className='text-muted-foreground'>/</span>

      {/* Team Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='flex items-center gap-2 text-foreground hover:bg-accent'>
            <span className='font-medium'>{selectedTeam}</span>
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          {teams.map((team) => (
            <DropdownMenuItem key={team.id} onClick={() => onTeamChange(team.name)}>
              <span>{team.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Breadcrumb Separator */}
      <span className='text-muted-foreground'>/</span>

      {/* Project Selector */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='flex items-center gap-2 text-foreground hover:bg-accent'>
            <span className='font-medium'>{selectedProject}</span>
            <ChevronDown size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          {projects.map((project) => (
            <DropdownMenuItem key={project.id} onClick={() => onProjectChange(project.name)}>
              <span>{project.name}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
