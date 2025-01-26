'use server';

import { Engine } from '@thirdweb-dev/engine';
import { CHAIN, GLOBAL_VOTER_ID_ZKME_ADDRESS } from './constants';

const {
  THIRDWEB_ENGINE_URL,
  THIRDWEB_ENGINE_ACCESS_TOKEN,
  THIRDWEB_BACKEND_WALLET_ADDRESS,
  THIRDWEB_BACKEND_SMART_ACCOUNT_ADDRESS
} = process.env;

if (!THIRDWEB_ENGINE_URL) throw new Error('THIRDWEB_ENGINE_URL is missing');
if (!THIRDWEB_ENGINE_ACCESS_TOKEN)
  throw new Error('THIRDWEB_ENGINE_ACCESS_TOKEN is missing');
if (!THIRDWEB_BACKEND_WALLET_ADDRESS)
  throw new Error('THIRDWEB_BACKEND_WALLET_ADDRESS is missing');
if (!THIRDWEB_BACKEND_SMART_ACCOUNT_ADDRESS)
  throw new Error('THIRDWEB_BACKEND_SMART_ACCOUNT_ADDRESS is missing');

export async function mintMembershipZkMe(address: string) {
  const engine = new Engine({
    url: THIRDWEB_ENGINE_URL as string,
    accessToken: THIRDWEB_ENGINE_ACCESS_TOKEN as string
  });

  try {
    await engine.erc20.mintTo(
      CHAIN,
      GLOBAL_VOTER_ID_ZKME_ADDRESS,
      THIRDWEB_BACKEND_WALLET_ADDRESS as string,
      {
        toAddress: address,
        amount: '1.0'
      },
      false,
      '',
      THIRDWEB_BACKEND_SMART_ACCOUNT_ADDRESS
    );
  } catch (error) {
    console.error('Error during minting:', error);
    throw new Error('Failed to mint membership SBT');
  }
}

export async function getZkMeToken() {
  const { ZKME_API_KEY } = process.env;

  if (!ZKME_API_KEY) {
    throw new Error('ZKME_API_KEY is missing');
  }

  const response = await fetch('https://nest-api.zk.me/api/token/get', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'User-Agent': 'World Association'
    },
    body: JSON.stringify({
      apiKey: ZKME_API_KEY,
      appId: 'M2024053066119595336406774111128',
      apiModePermission: 1,
      lv: 2
    })
  });

  if (!response.ok) {
    throw new Error('Failed to fetch zkMe token');
  }

  const data = await response.json();

  return data.data.accessToken;
}
