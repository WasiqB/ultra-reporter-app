'use client';

import { createFlagsmithInstance } from 'flagsmith/isomorphic';
import { FlagsmithProvider } from 'flagsmith/react';
import { IState } from 'flagsmith/types';
import { useRef } from 'react';

interface FlagsProviderProps {
  serverState: IState<string>;
  children: JSX.Element;
}

const FlagsProvider = ({
  serverState,
  children,
}: FlagsProviderProps): JSX.Element => {
  const flags = useRef(createFlagsmithInstance());
  return (
    <FlagsmithProvider flagsmith={flags.current} serverState={serverState}>
      {children}
    </FlagsmithProvider>
  );
};

export default FlagsProvider;
