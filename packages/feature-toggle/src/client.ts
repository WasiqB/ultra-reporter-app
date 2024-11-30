import { createFlagsmithInstance } from 'flagsmith/isomorphic';
import { IState } from 'flagsmith/types';

export const getFeatureState = async (): Promise<IState<string>> => {
  const flagsmith = createFlagsmithInstance();
  await flagsmith.init({
    evaluationContext: {
      environment: {
        apiKey: process.env.NEXT_PUBLIC_FLAGSMITH_ENVIRONMENT_ID,
      },
    },
  });
  return flagsmith.getState();
};
