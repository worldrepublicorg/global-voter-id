'use client';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  okxWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets';
import { useMemo } from 'react';
import { http, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { NEXT_PUBLIC_WC_PROJECT_ID } from './config';

export function useWamigConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? '';
  if (!projectId) {
    const providerErrMessage =
      'To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable';
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName: 'Recommended wallet',
          wallets: [coinbaseWallet]
        },
        {
          groupName: 'Other wallets',
          wallets: [metaMaskWallet, okxWallet, walletConnectWallet]
        }
      ],
      {
        appName: 'Global Voter ID',
        projectId
      }
    );

    const wagmiConfig = createConfig({
      chains: [base, baseSepolia],
      multiInjectedProviderDiscovery: false,
      connectors,
      ssr: true,
      transports: {
        [base.id]: http(),
        [baseSepolia.id]: http()
      }
    });

    return wagmiConfig;
  }, [projectId]);
}
