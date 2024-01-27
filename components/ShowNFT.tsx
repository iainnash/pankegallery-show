import Image from "next/image";
import { useCallback, useState, useMemo } from "react";
import { formatEther, parseAbi } from "viem";
import {
  useAccount,
  useContractReads,
  usePrepareContractWrite,
  useWalletClient,
} from "wagmi";

const abi = parseAbi([
  "function mint(uint256 id) payable",
  "function ownerOf(uint256 id) external view returns (address)",
]);

const PurchaseSection = ({ price, contract, id }: any) => {
  const { data } = useContractReads({
    contracts: [
      {
        abi: abi,
        address: contract,
        functionName: "ownerOf",
        args: [BigInt(id)],
      },
    ],
  });
  const { config, error: mintError } = usePrepareContractWrite({
    abi: abi,
    address: contract,
    functionName: "mint",
    enabled: data?.[0].status === "failure",
    args: [id],
    value: price,
  });
  const account = useAccount();
  const walletClient = useWalletClient();

  const [error, setError] = useState<Error | undefined>(undefined);
  const [purchasing, setPurchasing] = useState(false);
  const [transactionId, setTransactionId] = useState<string>();

  const purchase = useCallback(async () => {
    try {
      setError(undefined);
      setPurchasing(true);
      console.log({ walletCD: walletClient.data, configR: config.request });
      const writeResponse = await walletClient.data?.writeContract(
        config.request
      );
      setPurchasing(false);
      setTransactionId(writeResponse);
    } catch (e: any) {
      console.error(e);
      setError(e);
      setPurchasing(false);
    }
  }, [setError, setPurchasing, setTransactionId, walletClient, config.request]);

  return (
    <div>
      {!data?.[0].error && (
        <>
          <div>Already sold on primary.</div>
          <div>
            Owned by {data?.[0].result}{" "}
            {account.address === data?.[0].result ? "(you)" : ""}
          </div>
        </>
      )}
      {transactionId && (
        <>
          <div>Purchase transaction submitted.</div>
          <div>
            <a
              href={`https://${
                process.env.NEXT_PUBLIC_NETWORK_ID === "4" ? "rinkeby." : ""
              }etherscan.io/tx/${transactionId}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Etherscan
            </a>
          </div>
        </>
      )}
      {data?.[0].error && !transactionId && (
        <>
          <div>Purchase for {formatEther(price)} ETH</div>
          <br />

          {account.address ? (
            <>
              {!mintError && (
                <button
                  onClick={purchase}
                  style={{ cursor: "pointer", fontSize: "1.4em", padding: 6 }}
                  disabled={purchasing}
                >
                  {purchasing ? "Purchasing" : "Purchase"}
                </button>
              )}
              {mintError && (
                <div>
                  <br />
                  Error: {(mintError as any).shortMessage}
                </div>
              )}
              {error && (
                <div>
                  <br />
                  Error: {error.message?.toString()}
                </div>
              )}
            </>
          ) : (
            <div>
              Please connect your wallet in the upper right corner to continue.
            </div>
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
        src={nft.image.replace("ipfs://", "https://cloudflare-ipfs.com/ipfs/")}
        alt={nft.name}
      />
    </div>
    <div>&nbsp;</div>
    <div><strong>{nft.name}</strong></div>
    <div>&nbsp;</div>
    <div>{nft.description}</div>
    <div>&nbsp;</div>
    <PurchaseSection price={price} contract={contract} id={id} />
  </div>
);
