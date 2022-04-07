import { useNFT } from "@zoralabs/nft-hooks";
import Image from "next/image";

export const NFTListItem = ({
  exhibit,
  indx,
  nft,
  width,
  height,
  contract,
}: any) => {
  const nftData = useNFT(contract, indx, { useBetaIndexer: true });

  return (
    <a
      href={`/exhibit/${exhibit}/${indx}`}
      key={indx}
      style={{
        display: "inline-block",
        padding: "20px",
        margin: "0 auto",
        textAlign: "center",
        textDecoration: "none",
      }}
    >
      <Image
        width={width}
        height={height}
        src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
        alt={nft.name}
      />
      <div
        style={{
          paddingTop: 10,
          fontSize: "1.1em",
        }}
      >
        {nft.name}
        <div style={{ display: "inline-block", paddingLeft: "12px" }}>
          {nftData?.data?.nft.owner ? " [sold]" : ""}
        </div>
      </div>
    </a>
  );
};
