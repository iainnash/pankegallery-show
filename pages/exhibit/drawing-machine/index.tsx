import { ListNFTs } from "../../../components/ListNFTs";
import Markdown from "../../../components/Markdown";
import data from "../../../data/drawing-machine.json";
import drawingMachine from "../../../data/drawing-machine.md";

const DrawingMachine = () => {
  return (
    <div style={{ padding: "40px" }}>
      <Markdown markdown={drawingMachine} />
      <ListNFTs
        width={960}
        height={540}
        exhibit="drawing-machine"
        contract={process.env.NEXT_PUBLIC_DRAWING_MACHINE_CONTRACT}
        nfts={data}
      />
    </div>
  );
};

export default DrawingMachine;
