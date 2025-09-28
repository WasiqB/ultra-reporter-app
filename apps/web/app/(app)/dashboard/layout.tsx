/* eslint-disable @stylistic/js/max-len */
'use client';

import { AppSidebar } from '@ultra-reporter/ui/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@ultra-reporter/ui/components/breadcrumb';
import { Separator } from '@ultra-reporter/ui/components/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@ultra-reporter/ui/components/sidebar';
import { usePathname } from 'next/navigation';
import { JSX, ReactNode } from 'react';

/**
 * Breadcrumb item interface for navigation
 */
interface BreadcrumbItem {
  /** Display label for the breadcrumb */
  label: string;
  /** URL path for the breadcrumb link */
  href: string;
  /** Whether this breadcrumb item is currently active */
  isActive: boolean;
}

/**
 * Props for the DashboardLayout component
 */
interface DashboardLayoutProps {
  /** Child components to render within the dashboard layout */
  children: ReactNode;
}

/**
 * Sidebar state interface for managing collapsible functionality
 */
interface SidebarState {
  /** Whether the sidebar is currently collapsed */
  isCollapsed: boolean;
  /** Function to toggle sidebar collapse state */
  toggleCollapse: () => void;
}

/**
 * Dashboard layout component that provides a consistent layout structure
 * with collapsible sidebar navigation for all dashboard pages.
 *
 * Features:
 * - Collapsible sidebar with icon-only mode for space optimization
 * - Responsive design that adapts to mobile and desktop viewports
 * - Dynamic breadcrumb navigation based on current route
 * - Proper TypeScript interfaces for type safety
 * - Integration with Shadcn UI components for consistent styling
 * - Authentication state awareness for sidebar content
 * - Keyboard shortcuts for sidebar toggle (Ctrl/Cmd + B)
 *
 * Requirements addressed:
 * - 1.1: Dashboard interface with collapsible sidebar
 * - 1.2: Professional dashboard interface
 * - 2.6: Collapsible sidebar for screen space optimization
 */
const DashboardLayout = ({ children }: DashboardLayoutProps): JSX.Element => {
  const pathname = usePathname();

  /**
   * Generate breadcrumb items based on current pathname
   * Transforms URL segments into user-friendly navigation breadcrumbs
   *
   * @returns Array of breadcrumb items with labels, hrefs, and active states
   */
  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbItems: BreadcrumbItem[] = [];

    // Always start with Dashboard as the root breadcrumb
    breadcrumbItems.push({
      label: 'Dashboard',
      href: '/dashboard',
      isActive: pathname === '/dashboard',
    });

    // Add additional segments if not on dashboard root
    if (segments.length > 1) {
      for (let i = 1; i < segments.length; i++) {
        const segment = segments[i];
        if (segment) {
          const href = '/' + segments.slice(0, i + 1).join('/');
          const isActive = href === pathname;

          // Transform segment names to be more user-friendly
          let label = segment.charAt(0).toUpperCase() + segment.slice(1);

          // Handle special cases for better UX
          switch (segment) {
            case 'loading':
              label = 'Processing';
              break;
            case 'results':
              label = 'Report Results';
              break;
            default:
              // Replace hyphens and underscores with spaces
              label = label.replace(/[-_]/g, ' ');
          }

          breadcrumbItems.push({
            label,
            href,
            isActive,
          });
        }
      }
    }

    return breadcrumbItems;
  };

  const breadcrumbItems = getBreadcrumbItems();

  return (
    <SidebarProvider>
      {/* Enhanced sidebar with collapsible functionality */}
      <AppSidebar />

      {/* Main content area with sidebar integration */}
      <SidebarInset>
        {/* Header with sidebar trigger and breadcrumbs - responsive design */}
        <header className='group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 bg-background/95 supports-[backdrop-filter]:bg-background/60 flex h-16 shrink-0 items-center gap-2 border-b backdrop-blur transition-[width,height] ease-linear'>
          <div className='flex w-full items-center gap-2 px-4'>
            {/* Sidebar toggle button with keyboard shortcut support */}
            <SidebarTrigger className='hover:bg-accent hover:text-accent-foreground -ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />

            {/* Dynamic breadcrumb navigation */}
            <Breadcrumb className='flex-1'>
              <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                  <div key={item.href} className='flex items-center'>
                    <BreadcrumbItem className='hidden md:block'>
                      {item.isActive ? (
                        <BreadcrumbPage className='text-foreground font-medium'>
                          {item.label}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={item.href}
                          className='text-muted-foreground hover:text-foreground transition-colors'
                        >
                          {item.label}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbItems.length - 1 && (
                      <BreadcrumbSeparator className='hidden md:block' />
                    )}
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>

            {/* Mobile breadcrumb - show only current page on small screens */}
            <div className='md:hidden'>
              <span className='text-foreground font-medium'>
                {breadcrumbItems[breadcrumbItems.length - 1]?.label ||
                  'Dashboard'}
              </span>
            </div>
          </div>
        </header>

        {/* Main content area with proper spacing and responsive design */}
        <div className='flex min-h-0 flex-1 flex-col gap-4 overflow-auto p-4 pt-0'>
          <div className='flex-1 space-y-4'>{children}</div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;

// Export interfaces for use in other components
export type { BreadcrumbItem, DashboardLayoutProps, SidebarState };
