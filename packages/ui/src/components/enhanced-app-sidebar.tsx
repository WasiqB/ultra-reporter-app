'use client';

import {
  Bell,
  CreditCard,
  FileText,
  History,
  LogIn,
  LogOut,
  Settings,
  Sparkles,
  Upload,
  User,
  UserPlus,
} from 'lucide-react';
import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from './sidebar';

// Types for the enhanced sidebar
export interface EnhancedSidebarUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  isAnonymous?: boolean;
}

export interface MenuItem {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  requiresAuth?: boolean;
}

export interface EnhancedSidebarProps
  extends React.ComponentProps<typeof Sidebar> {
  user?: EnhancedSidebarUser | null;
  onAuthAction?: (action: 'signin' | 'signout' | 'signup') => void;
  currentPath?: string;
}

// Default menu items available to all users
const defaultMenuItems: MenuItem[] = [
  {
    title: 'Reports',
    url: '/dashboard/reports',
    icon: FileText,
    requiresAuth: false,
  },
  {
    title: 'Upload',
    url: '/dashboard/upload',
    icon: Upload,
    requiresAuth: false,
  },
  {
    title: 'View History',
    url: '/dashboard/history',
    icon: History,
    requiresAuth: false,
  },
];

function UserProfileSection({
  user,
  onAuthAction,
}: {
  user?: EnhancedSidebarUser | null;
  onAuthAction?: (action: 'signin' | 'signout' | 'signup') => void;
}) {
  const { isMobile } = useSidebar();

  // For non-authenticated users (anonymous or no user)
  if (!user || user.isAnonymous) {
    const displayName = user?.isAnonymous ? 'Guest' : 'Guest';
    const displayEmail = user?.isAnonymous ? 'Anonymous User' : 'Not signed in';

    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarFallback className='bg-muted rounded-lg'>
                    <User className='h-4 w-4' />
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{displayName}</span>
                  <span className='text-muted-foreground truncate text-xs'>
                    {displayEmail}
                  </span>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
              side={isMobile ? 'bottom' : 'right'}
              align='end'
              sideOffset={4}
            >
              <DropdownMenuLabel className='p-0 font-normal'>
                <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarFallback className='bg-muted rounded-lg'>
                      <User className='h-4 w-4' />
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-medium'>{displayName}</span>
                    <span className='text-muted-foreground truncate text-xs'>
                      {displayEmail}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onAuthAction?.('signin')}>
                <LogIn className='h-4 w-4' />
                Sign in
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  // For authenticated users
  const maskEmail = (email: string) => {
    const [localPart, domain] = email.split('@');
    if (!localPart || localPart.length <= 2) return email;
    const maskedLocal =
      localPart[0] +
      '*'.repeat(localPart.length - 2) +
      localPart[localPart.length - 1];
    return `${maskedLocal}@${domain}`;
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className='rounded-lg'>
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-medium'>{user.name}</span>
                <span className='text-muted-foreground truncate text-xs'>
                  {maskEmail(user.email)}
                </span>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className='rounded-lg'>
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-medium'>{user.name}</span>
                  <span className='text-muted-foreground truncate text-xs'>
                    {maskEmail(user.email)}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles className='h-4 w-4' />
                Upgrade
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Settings className='h-4 w-4' />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className='h-4 w-4' />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className='h-4 w-4' />
                Notification
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onAuthAction?.('signout')}>
              <LogOut className='h-4 w-4' />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function MainNavigation({
  menuItems,
  currentPath,
}: {
  menuItems: MenuItem[];
  currentPath?: string;
}) {
  return (
    <SidebarMenu>
      {menuItems.map((item) => {
        const isActive = currentPath === item.url;
        return (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
              <a href={item.url}>
                <item.icon className='h-4 w-4' />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

function AuthenticationFooter({
  user,
  onAuthAction,
}: {
  user?: EnhancedSidebarUser | null;
  onAuthAction?: (action: 'signin' | 'signout' | 'signup') => void;
}) {
  // Only show sign up/login button for non-authenticated users
  if (!user || user.isAnonymous) {
    return (
      <div className='flex flex-col gap-2 p-2'>
        <Button
          variant='outline'
          size='sm'
          className='w-full justify-start'
          onClick={() => onAuthAction?.('signin')}
        >
          <LogIn className='mr-2 h-4 w-4' />
          Sign In
        </Button>
        <Button
          variant='default'
          size='sm'
          className='w-full justify-start'
          onClick={() => onAuthAction?.('signup')}
        >
          <UserPlus className='mr-2 h-4 w-4' />
          Sign Up
        </Button>
      </div>
    );
  }

  return null;
}

export function EnhancedAppSidebar({
  user,
  onAuthAction,
  currentPath,
  ...props
}: EnhancedSidebarProps) {
  // Filter menu items based on authentication requirements if needed
  const availableMenuItems = defaultMenuItems.filter((item) => {
    // For now, all menu items are available to all users as per requirements
    return true;
  });

  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <UserProfileSection user={user} onAuthAction={onAuthAction} />
      </SidebarHeader>
      <SidebarContent>
        <MainNavigation
          menuItems={availableMenuItems}
          currentPath={currentPath}
        />
      </SidebarContent>
      <SidebarFooter>
        <AuthenticationFooter user={user} onAuthAction={onAuthAction} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
