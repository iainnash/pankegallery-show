import Head from "../../../components/head";
import data from "../../../data/og-flowers.json";
import { ShowNFT } from "../../../components/ShowNFT";


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

export async function getStaticPaths() {
  const paths = data.map((_: any, idx: number) => ({ params: { id: String(idx) } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }: any) {
  return {
    props: { id: params.id },
  };
}

export default OgFlowersPiece;
