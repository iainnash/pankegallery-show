import { ListNFTs } from "../../../components/ListNFTs";
import Markdown from "../../../components/Markdown";
import data from "../../../data/og-flowers.json";
import ogFlowers from "../../../data/og-flowers.md";

const OgFlowers = () => {
  return (
    <div style={{ padding: '40px' }}>
      <Markdown markdown={ogFlowers} />
      <ListNFTs
        width={400}
        height={400}
        exhibit="og-flowers"
        contract={process.env.NEXT_PUBLIC_OG_FLOWERS_CONTRACT_ADDRESS}
        nfts={data}
      />
    </div>
  );
};

export default OgFlowers;
