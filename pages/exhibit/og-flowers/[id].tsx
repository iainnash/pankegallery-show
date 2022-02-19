import { ShowNFT } from "../../../components/ShowNFT";
import data from "../../../data/og-flowers.json";

const OgFlowersPiece = ({ id }: any) => {
  return (
    <div style={{ padding: "20px" }}>
      <ShowNFT
        contract={process.env.NEXT_PUBLIC_OG_FLOWERS_CONTRACT_ADDRESS}
        id={id}
        nft={data[parseInt(id)]}
        width={1000}
        height={1000}
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
