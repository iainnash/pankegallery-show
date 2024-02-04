"use client";

import { useCallback, useState } from "react";
import { formatEther, parseAbi } from "viem";
import { mainnet } from "viem/chains";
import {
  useAccount,
  useChainId,
  useContractReads,
  useSwitchChain,
  useWalletClient,
  useWriteContract,
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
  const {
    data: hash,
    error: mintError,
    isPending: purchasing,
    writeContract,
  } = useWriteContract();
  const account = useAccount();
  const walletClient = useWalletClient();

  const [error, setError] = useState<Error | undefined>(undefined);

  const purchase = useCallback(async () => {
    try {
      setError(undefined);
      writeContract({
        chainId: mainnet.id,
        abi: abi,
        address: contract,
        functionName: "mint",
        args: [id],
        value: price,
      });
    } catch (e: any) {
      console.error(e);
      setError(e);
    }
  }, [setError, writeContract, walletClient]);

  const chainId = useChainId();
  // const { switchChain } = useSwitchChain();

  if (chainId !== mainnet.id) {
    return (
      <div>
        Please switch your wallet to mainnet.
        {/* <button onClick={() => switchChain({ chainId: mainnet.id })}>
          Switch to Mainnet
        </button> */}
      </div>
    );
  }

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
      {hash && (
        <>
          <div>Purchase transaction submitted.</div>
          <div>
            <a
              href={`https://${
                process.env.NEXT_PUBLIC_NETWORK_ID === "4" ? "rinkeby." : ""
              }etherscan.io/tx/${hash}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Etherscan
            </a>
          </div>
        </>
      )}
      {data?.[0].error && !hash && (
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

export default PurchaseSection;