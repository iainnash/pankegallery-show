export const NETWORK_ID: string = process.env.NEXT_PUBLIC_NETWORK_ID!;
if (!NETWORK_ID) {
  throw new Error("NetworkID is required.");
}

export const APP_TITLE = process.env.NEXT_PUBLIC_APP_TITLE
export const APP_DESCRIPTION = process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION || ''
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ''
export const DEFAULT_OG_CARD = `${BASE_URL}/meta-content/social-card.jpg`
export const FAVICON = `${BASE_URL}/meta-content/social-card.jpg`

export const RPC_URL: string | undefined = process.env.NEXT_PUBLIC_RPC_URL;
