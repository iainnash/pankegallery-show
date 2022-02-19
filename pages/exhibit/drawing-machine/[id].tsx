import { ListNFTs } from "../../../components/ListNFTs";
import Markdown from "../../../components/Markdown";
import { ShowNFT } from "../../../components/ShowNFT";
import data from "../../../data/drawing-machine.json";
import drawingMachine from "../../../data/drawing-machine.md";

const DrawingMachinePiece = ({ id }: any) => {
  return (
    <div style={{ padding: "20px" }}>
      {/* <Markdown markdown={drawingMachine} /> */}
      <ShowNFT
        contract={process.env.NEXT_PUBLIC_DRAWING_MACHINE_CONTRACT}
        id={id}
        nft={data[parseInt(id)]}
        width={1920}
        height={1080}
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
