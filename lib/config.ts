export const NEXT_PUBLIC_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://globalvoterid.org';
export const NEXT_PUBLIC_CDP_API_KEY = process.env.NEXT_PUBLIC_CDP_API_KEY;
export const NEXT_PUBLIC_WC_PROJECT_ID = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
