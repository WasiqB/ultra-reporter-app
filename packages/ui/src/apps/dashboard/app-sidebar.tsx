'use client';

import * as React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
  useSidebar,
} from '../../components/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/dropdown-menu';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Eye,
  FileText,
  HelpCircle,
  Home,
  LogOut,
  Moon,
  Settings,
  Sun,
  Upload,
  User,
  Wand2,
  Zap,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/avatar';
import { Button } from '../../components/button';
import { Card } from '../../components/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/collapsible';
import { useTheme } from 'next-themes';
import { IconDotsVertical } from '@tabler/icons-react';
import { signOut } from '@ultra-reporter/auth/actions-client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface AppSidebarProps {
  onMenuClick?: (menuId: string) => void;
}

export function AppSidebar({ onMenuClick }: AppSidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const [expandedMenu, setExpandedMenu] = React.useState<string | null>('reports');
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  const menuItems = [
    {
      id: 'home',
      label: 'Home',
      icon: Home,
      expandable: false,
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: FileText,
      expandable: true,
      subItems: [
        { id: 'upload-report', label: 'Upload report', icon: Upload },
        { id: 'view-reports', label: 'View reports', icon: Eye },
        {
          id: 'create-custom-report',
          label: 'Create custom report',
          icon: Wand2,
        },
      ],
    },
  ];

  const userMenuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const toggleCategory = (categoryId: string) => {
    setExpandedMenu(expandedMenu === categoryId ? null : categoryId);
  };

  const handleMenuClick = (menuId: string) => {
    setActiveMenu(menuId);
    onMenuClick?.(menuId);
  };

  const handleSignOut = async () => {
    await signOut({
      initFn: () => {
        setIsLoading(true);
      },
      successFn: () => {
        router.push('/');
        setIsLoading(false);
        toast.success('Logout successful!', {
          description: 'You are now logged out.',
        });
      },
      errorFn: (ctx) => {
        setIsLoading(false);
        toast.error(ctx.error.name, {
          description: ctx.error.message,
        });
      },
    });
  };

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground font-bold text-sm shrink-0'>
              U
            </div>
            {state === 'expanded' && <h1 className='text-lg font-bold text-sidebar-foreground'>Ultra</h1>}
          </div>
          {state === 'expanded' && (
            <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => toggleSidebar()}>
              <ChevronLeft className='h-4 w-4' />
            </Button>
          )}
          {state === 'collapsed' && (
            <Button variant='ghost' size='icon' className='h-8 w-8' onClick={() => toggleSidebar()}>
              <ChevronRight className='h-4 w-4' />
            </Button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.id}>
              {item.expandable && item.subItems ? (
                <Collapsible open={expandedMenu === item.id} onOpenChange={() => toggleCategory(item.id)}>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      tooltip={state === 'collapsed' ? item.label : undefined}
                      className={`transition-colors ${
                        activeMenu === item.id
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'hover:bg-sidebar-accent/50'
                      }`}
                    >
                      <item.icon className='size-4' />
                      {state === 'expanded' && <span>{item.label}</span>}
                      {state === 'expanded' && (
                        <ChevronDown className='ml-auto size-4 transition-transform duration-200' />
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.subItems.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.id}>
                          <SidebarMenuSubButton
                            onClick={() => handleMenuClick(subItem.id)}
                            className={`transition-colors ${
                              activeMenu === subItem.id
                                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                                : 'hover:bg-sidebar-accent/50'
                            }`}
                          >
                            {subItem.icon && <subItem.icon className='size-4' />}
                            <span>{subItem.label}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <SidebarMenuButton
                  tooltip={state === 'collapsed' ? item.label : undefined}
                  onClick={() => handleMenuClick(item.id)}
                  className={`transition-colors ${
                    activeMenu === item.id
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'hover:bg-sidebar-accent/50'
                  }`}
                >
                  <item.icon className='size-4' />
                  {state === 'expanded' && <span>{item.label}</span>}
                </SidebarMenuButton>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        {state === 'expanded' && (
          <>
            <Card className='bg-sidebar-accent border-sidebar-border p-4 mb-2'>
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <span className='text-xs font-semibold text-sidebar-accent-foreground'>Usage</span>
                  <Zap size={14} className='text-sidebar-primary' />
                </div>
                <div>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-xs text-sidebar-accent-foreground'>Reports</span>
                    <span className='text-xs font-semibold text-sidebar-accent-foreground'>850 / 1000</span>
                  </div>
                  <div className='w-full bg-sidebar-border rounded-full h-2'>
                    <div className='bg-sidebar-primary h-2 rounded-full' style={{ width: '85%' }} />
                  </div>
                </div>
                <Button
                  size='sm'
                  className='w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 text-xs'
                >
                  Upgrade Plan
                </Button>
              </div>
            </Card>
            <SidebarSeparator />
          </>
        )}

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={toggleTheme}
              tooltip={state === 'collapsed' ? 'Toggle theme' : undefined}
              className='hover:bg-sidebar-accent/50 transition-colors'
            >
              {theme === 'light' ? <Moon className='size-4' /> : <Sun className='size-4' />}
              {state === 'expanded' && <span>{theme === 'light' ? 'Dark' : 'Light'}</span>}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-colors'
            >
              <Avatar className='h-8 w-8'>
                <AvatarImage src='https://github.com/shadcn.png' alt='User' />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              {state === 'expanded' && (
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>John Doe</span>
                  <span className='truncate text-xs'>john@example.com</span>
                </div>
              )}
              <IconDotsVertical className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56' align='end' side='right' sideOffset={4}>
            {userMenuItems.map((item) => (
              <DropdownMenuItem
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`transition-colors ${
                  activeMenu === item.id ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                }`}
              >
                <item.icon className='mr-2 h-4 w-4' />
                <span>{item.label}</span>
              </DropdownMenuItem>
            ))}
            <SidebarSeparator />
            <DropdownMenuItem className='text-destructive' onClick={handleSignOut} disabled={isLoading}>
              <LogOut className='mr-2 h-4 w-4' />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
