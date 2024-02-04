import { css } from "@emotion/react";
import dynamic from "next/dynamic";
import Image from "next/image";

const PurchaseSection = dynamic(() => import("./PurchaseSection"), {
  ssr: false,
});

export const ShowNFT = ({ price, id, width, height, nft, contract }: any) => (
  <div>
    <div>
      {/* <Image
        width={width}
        height={height}
        // className={
        //   css`
        //     objectfit: contain;
        //     max-width: 100%;
        //   ` as any
        // }
        src={nft.image.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")}
        alt={nft.name}
      /> */}
      <img
        src={nft.image.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")}
        css={
          css`
            objectfit: contain;
            max-width: 100%;
          ` as any
        }
      />
    </div>
    <div>&nbsp;</div>
    <div>
      <strong>{nft.name}</strong>
    </div>
    <div>&nbsp;</div>
    <div>{nft.description}</div>
    <div>&nbsp;</div>
    <PurchaseSection price={price} contract={contract} id={id} />
  </div>
);
