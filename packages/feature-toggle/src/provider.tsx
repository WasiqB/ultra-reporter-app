import { DevCycleClientsideProvider } from '@devcycle/nextjs-sdk';
import { JSX } from 'react';
import { getClientContext } from './devcycle';

export const FeatureProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <DevCycleClientsideProvider context={getClientContext()}>
      {children}
    </DevCycleClientsideProvider>
  );
};
