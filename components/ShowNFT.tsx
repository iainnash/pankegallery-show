import { useNFT } from "@zoralabs/nft-hooks";
import { useWeb3Wallet } from "@zoralabs/simple-wallet-provider";
import Image from "next/image";
import { useCallback, useState, useMemo } from "react";
import { Contract } from "@ethersproject/contracts";
import { formatEther } from "@ethersproject/units";

const PurchaseSection = ({ price, contract, id }: any) => {
  const nft = useNFT(contract, id);
  const { library, active, account } = useWeb3Wallet();
  const ethersContract = useMemo(() => {
    return new Contract(
      contract,
      ["function mint(uint256 id) payable external"],
      library?.getSigner()
    );
  }, [library]);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState<any>();
  const [transactionId, setTransactionId] = useState<undefined | string>();
  const purchase = useCallback(async () => {
    try {
      setError(undefined);
      setPurchasing(true);
      const response = await ethersContract.mint(id, {
        value: price,
      });
      setPurchasing(false);
      setTransactionId(response.hash);
    } catch (e) {
      console.error(e);
      setError(e);
      setPurchasing(false);
    }
  }, [library]);

  // console.log(nft)
  return (
    <div>
      {nft.data && (
        <>
          <p>Already sold on primary.</p>
          <p>
            Owned by {nft.data.nft?.owner}{" "}
            {account === nft.data.nft?.owner ? "(you)" : ""}
          </p>
        </>
      )}
      {transactionId && (
        <>
          <p>Purchase transaction submitted.</p>
          <p>
            <a
              href={`https://${
                process.env.NEXT_PUBLIC_NETWORK_ID === "4" ? "rinkeby." : ""
              }etherscan.io/tx/${transactionId}`}
              target="_blank"
              rel="noreferrer"
            >
              View on etherscan
            </a>
          </p>
        </>
      )}
      {nft.error && !transactionId && (
        <>
          <p>Purchase for {formatEther(price)} ETH</p>

          {active ? (
            <>
              <button
                onClick={purchase}
                style={{ cursor: "pointer", fontSize: "1.4em", padding: 6 }}
                disabled={purchasing}
              >
                {purchasing ? "Purchasing" : "Purchase"}
              </button>
              {error && <p><br />{error.error.message.toString()}</p>}
            </>
          ) : (
            <p>
              Please connect your wallet in the upper right corner to continue.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export const ShowNFT = ({ price, id, width, height, nft, contract }: any) => (
  <div>
    <div>
      <Image
        width={width}
        height={height}
        // className={
        //   css`
        //     objectfit: contain;
        //     max-width: 100%;
        //   ` as any
        // }
        src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
        alt={nft.name}
      />
    </div>
    <p>{nft.name}</p>
    <p>{nft.description}</p>

    <PurchaseSection price={price} contract={contract} id={id} />
  </div>
);
