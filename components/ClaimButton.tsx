'use client';

import { useState, useEffect } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Button } from './ui/button';
import { GLOBAL_VOTER_ID_ZKME_ADDRESS } from 'lib/constants';
import { ZkMeWidget } from '@zkmelabs/widget';
import { getZkMeToken, mintMembershipZkMe } from 'lib/actions';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from './ui/alert-dialog';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';

const ClaimButton = () => {
  const { address } = useAccount();
  const { data: balanceData } = useBalance({
    address: address,
    token: GLOBAL_VOTER_ID_ZKME_ADDRESS
  });

  const [widget, setWidget] = useState<ZkMeWidget | null>(null);

  const [showResultDialog, setShowResultDialog] = useState(false);
  const [resultDialogContent, setResultDialogContent] = useState({
    title: '',
    description: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const initializeWidget = async () => {
      if (!address) {
        setWidget(null);
        return;
      }

      const accessToken = await getZkMeToken();

      try {
        const newProvider = {
          async getAccessToken() {
            return accessToken;
          },
          async getUserAccounts() {
            return [address];
          }
        };

        const newWidget = new ZkMeWidget(
          'M2024053066119595336406774111128',
          'World Association',
          '0x2105',
          newProvider,
          {
            lv: 'MeID',
            mode: 'wallet'
          }
        );
        setWidget(newWidget);
      } catch (error) {
        setWidget(null);
      }
    };

    initializeWidget();
  }, [address]);

  const handleLaunchWidget = () => {
    if (widget) {
      widget.launch();
      widget.on('meidFinished', async (results) => {
        if (results.isGrant) {
          await handleMintMembershipZkMe();
        }
      });
    }
  };

  const handleMintMembershipZkMe = async () => {
    if (!address || (balanceData && balanceData.value > BigInt(0))) {
      return;
    }

    setIsProcessing(true);
    setShowResultDialog(true);

    try {
      await mintMembershipZkMe(address);
      setResultDialogContent({
        title: 'Success',
        description: 'Your voter ID has been successfully created!'
      });
    } catch (error) {
      console.error('Error minting membership SBT:', error);
      setResultDialogContent({
        title: 'Error',
        description: 'There was an error while creating your voter ID.'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {!address ? (
        <ConnectWallet
        withWalletAggregator
        className="h-10 min-w-0 rounded-full bg-primary px-6 font-medium text-primary-foreground hover:bg-primary/90"
        text="Connect wallet"
      />
      ) : balanceData && balanceData.value > BigInt(0) ? (
        <a
          href="https://snapshot.org/#/worldrepublic.eth"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button>See current proposals</Button>
        </a>
      ) : (
        <Button onClick={handleLaunchWidget}>Claim your voter ID</Button>
      )}

      <AlertDialog open={showResultDialog} onOpenChange={setShowResultDialog}>
        <AlertDialogContent>
          {isProcessing ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin" />
              <AlertDialogDescription>
                Creating voter ID...
              </AlertDialogDescription>
            </div>
          ) : (
            <>
              <AlertDialogHeader>
                <AlertDialogTitle>{resultDialogContent.title}</AlertDialogTitle>
                <AlertDialogDescription>
                  {resultDialogContent.description}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="flex w-full justify-between gap-2">
                <Button
                  onClick={() => {
                    setShowResultDialog(false);
                  }}
                  className="w-40"
                  variant="outline"
                >
                  Close
                </Button>
                <a
                  href="https://snapshot.org/#/worldrepublic.eth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-40 sm:w-auto"
                >
                  <Button className="w-40">
                    View proposals
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </a>
              </AlertDialogFooter>
            </>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ClaimButton;
