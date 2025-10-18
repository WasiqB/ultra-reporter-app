import { DevCycleClientsideProvider } from '@devcycle/nextjs-sdk';
import type { JSX } from 'react';
import { getClientContext } from './devcycle';

export const FeatureProvider = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <DevCycleClientsideProvider context={getClientContext()}>{children}</DevCycleClientsideProvider>
);
