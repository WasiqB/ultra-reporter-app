import { DevCycleClientsideProvider } from '@devcycle/nextjs-sdk';
import { getClientContext } from './devcycle';

export const FeatureProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <DevCycleClientsideProvider context={getClientContext()}>
      {children}
    </DevCycleClientsideProvider>
  );
};
