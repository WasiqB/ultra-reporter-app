import { setupDevCycle } from '@devcycle/nextjs-sdk/server';

const getUserIdentity = async () => {
  return {
    user_id: '123',
  };
};

const { getVariableValue, getClientContext } = setupDevCycle({
  serverSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_SERVER_SDK_KEY ?? '',
  clientSDKKey: process.env.NEXT_PUBLIC_DEVCYCLE_CLIENT_SDK_KEY ?? '',
  userGetter: getUserIdentity,
  options: {
    enableStreaming: false,
    eventFlushIntervalMS: 1000,
  },
});

export { getClientContext, getVariableValue };
