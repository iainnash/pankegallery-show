import Head from "../../../components/head";
import { ShowNFT } from "../../../components/ShowNFT";
import data from "../../../data/drawing-machine.json";

const DrawingMachinePiece = ({ id }: any) => {
  const nft = data[parseInt(id)];
  return (
    <div style={{ padding: "20px" }}>
      <Head title={nft.name} ogImage={nft.image.replace('ipfs://', 'https://ipfs.io/ipfs/')} />
      {/* <Markdown markdown={drawingMachine} /> */}
      <ShowNFT
        contract={process.env.NEXT_PUBLIC_DRAWING_MACHINE_CONTRACT}
        id={id}
        nft={nft}
        width={1920}
        height={1080}
        price="220000000000000000"
      />
    </div>
  );
};

export async function getServerSideProps({ params }: any) {
  return {
    props: { id: params.id }, // will be passed to the page component as props
  };
}

export default DrawingMachinePiece;
