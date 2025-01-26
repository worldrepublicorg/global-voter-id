'use client';

import {
  Address,
  Avatar,
  EthBalance,
  Identity,
  Name
} from '@coinbase/onchainkit/identity';
import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
  WalletDropdownFundLink,
  WalletDropdownLink
} from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';

export default function LogInButton() {
  const { address } = useAccount();

  return (
    <>
      {address && (
        <Wallet>
          <ConnectWallet className="flex h-10 items-center rounded-full bg-transparent p-0 hover:bg-transparent">
            <Identity
              className="space-x-0 rounded-full bg-transparent p-0"
              address={address}
            >
              <Avatar className="h-7 w-7" />
            </Identity>
          </ConnectWallet>
          <WalletDropdown className="rounded-md border border-border shadow-md">
            <Identity
              className="bg-background px-4 pb-2 pt-3 hover:bg-muted"
              address={address}
              hasCopyAddressOnClick={true}
            >
              <Avatar />
              <Name />
              <Address />
              <EthBalance />
            </Identity>
            <WalletDropdownLink
              className="onchainkit-wallet-dropdown-link bg-background hover:bg-muted"
              icon="wallet"
              href="https://wallet.coinbase.com"
            >
              Go to wallet dashboard
            </WalletDropdownLink>
            <WalletDropdownFundLink className="onchainkit-wallet-dropdown-fund-link bg-background hover:bg-muted" />
            <WalletDropdownDisconnect className="onchainkit-wallet-dropdown-disconnect bg-background hover:bg-muted" />
          </WalletDropdown>
        </Wallet>
      )}
    </>
  );
}
