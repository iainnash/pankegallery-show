import Head from "../../../components/head";
import dynamic from "next/dynamic";
const ShowNFT = dynamic(
  () => import("../../../components/ShowNFT").then((m) => m.ShowNFT),
  { ssr: false }
);
import data from "../../../data/og-flowers.json";

const OgFlowersPiece = ({ id }: any) => {
  const nft = data[parseInt(id)];


  return (
    <div style={{ padding: "20px" }}>
      <Head title={nft.name} ogImage={`https://wsrv.nl/?w=512&url=${nft.image.replace('ipfs://', process.env.NEXT_PUBLIC_IPFS_HOST || 'https://cloudflare-ipfs.com/ipfs/')}`} />
      <ShowNFT
        contract={process.env.NEXT_PUBLIC_OG_FLOWERS_CONTRACT_ADDRESS}
        id={id}
        nft={nft}
        width={1000}
        height={1000}
        price="250000000000000000"
      />
    </div>
  );
};

export async function getServerSideProps({ params }: any) {
  return {
    props: { id: params.id }, // will be passed to the page component as props
  };
}

export default OgFlowersPiece;
