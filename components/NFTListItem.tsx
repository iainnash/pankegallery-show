import Image from "next/image";

export const NFTListItem = ({
  isAvailable,
  exhibit,
  indx,
  nft,
  width,
  height,
  contract,
}: any) => {
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
        style={{width: '100%', objectFit: 'contain'}}
        src={nft.image.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")}
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
          {isAvailable === true
            ? " [purchase]"
            : isAvailable === undefined
            ? ""
            : " [sold]"}
        </div>
      </div>
    </a>
  );
};
