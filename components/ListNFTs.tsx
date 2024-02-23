import { useEffect, useMemo, useState } from "react";
import Pagination from "react-paginating";
import { PageButtons } from "../styles/components";
import { NFTListItem } from "./NFTListItem";
import { useContractReads } from "wagmi";
import { parseAbi } from "viem";

const PAGE_SIZE = 20;

const abi = parseAbi([
  "function ownerOf(uint256 id) external view returns (address)",
]);

export const ListNFTs = ({ exhibit, contract, nfts, width, height }: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    if (window.location.hash) {
      setCurrentPage(parseInt(window.location.hash.substring(1)));
    }
  }, [typeof window !== "undefined" ? window.location.hash : ""]);
  const handlePageChange: any = (newPage: number | undefined, _: any) => {
    if (newPage) {
      setCurrentPage(newPage);
      if (typeof window !== "undefined") {
        (window.location.hash as any) = newPage.toString();
      }
    }
  };
  const shownNFTs = useMemo(
    () =>
      nfts
        .map((nft: any, indx: number) => ({ nft, indx }))
        .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE),
    [nfts, currentPage, PAGE_SIZE]
  );

  const contracts = useMemo(
    () =>
      shownNFTs.map(({ indx }: { indx: number }) => ({
        abi,
        functionName: "ownerOf",
        address: contract,
        args: [BigInt(indx)],
      })),
    [shownNFTs]
  );

  useEffect(() => {
    const listener = window.addEventListener("hashchange", () => {
      let bottom = document
        .getElementById("article")
        ?.getBoundingClientRect().bottom;
      if (bottom) {
        bottom += window.scrollY - 140;
      } else {
        bottom = 300;
      }
      window.scrollTo(0, bottom);
    });
    return () => {
      window.removeEventListener("hashchange", listener as any);
    };
  }, []);

  const { data: soldStatus } = useContractReads({
    contracts,
  });

  return (
    <PageButtons>
      <div
        style={
          exhibit.includes("flowers")
            ? {}
            : { display: "flex", flexDirection: "column" }
        }
      >
        {shownNFTs.map(({ nft, indx }: any, listIndx: number) => (
          <NFTListItem
            key={indx}
            contract={contract}
            exhibit={exhibit}
            isAvailable={soldStatus?.[listIndx]?.status === "failure"}
            indx={indx}
            nft={nft}
            width={width}
            height={height}
          />
        ))}
      </div>

      <Pagination
        className="pagination"
        total={nfts.length}
        limit={PAGE_SIZE}
        pageCount={nfts.length / PAGE_SIZE + 1}
        currentPage={currentPage}
      >
        {({
          pages,
          currentPage,
          hasNextPage,
          hasPreviousPage,
          previousPage,
          nextPage,
          totalPages,
          getPageItemProps,
        }) => (
          <div key={currentPage}>
            {hasPreviousPage && (
              <button
                {...getPageItemProps({
                  pageValue: previousPage,
                  onPageChange: handlePageChange,
                  total: totalPages,
                })}
              >
                {"<"}
              </button>
            )}

            {pages.map((page) => {
              let activePage = undefined;
              if (currentPage === page) {
                activePage = { backgroundColor: "#fdce09" };
              }
              return (
                <button
                  {...getPageItemProps({
                    pageValue: page,
                    total: totalPages,
                    style: activePage,
                    onPageChange: handlePageChange,
                  })}
                >
                  {page}
                </button>
              );
            })}

            {hasNextPage && (
              <button
                {...getPageItemProps({
                  pageValue: nextPage,
                  onPageChange: handlePageChange,
                  total: totalPages,
                })}
              >
                {">"}
              </button>
            )}
          </div>
        )}
      </Pagination>
    </PageButtons>
  );
};
