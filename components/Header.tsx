'use client';

import Link from 'next/link';
import LogInButton from './LogInButton';
import ThemeSwitcher from './ThemeSwitcher';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { useAccount } from 'wagmi';

export default function Header() {
  const { address } = useAccount();

  return (
    <header className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <div className="box-border size-[30px] rounded-full border-[5px] border-foreground"></div>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <LogInButton />
        {!address && (
          <ConnectWallet
            className="h-10 min-w-0 rounded-full bg-secondary px-6 font-medium text-secondary-foreground hover:bg-secondary/90"
            text="Create smart wallet"
          />
        )}
      </div>
    </header>
  );
}
