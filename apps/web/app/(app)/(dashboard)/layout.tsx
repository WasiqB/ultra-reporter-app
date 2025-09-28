import { JSX, ReactNode } from 'react';
import DashboardLayout from '../dashboard/layout';

interface DashboardRouteGroupLayoutProps {
  children: ReactNode;
}

const DashboardRouteGroupLayout = ({
  children,
}: DashboardRouteGroupLayoutProps): JSX.Element => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardRouteGroupLayout;
