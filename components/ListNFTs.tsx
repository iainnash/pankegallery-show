import { useEffect, useState } from "react";
import Pagination from "react-paginating";
import { PageButtons } from "../styles/components";
import { NFTListItem } from "./NFTListItem";

const PAGE_SIZE = 20;

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
  const shownNFTs = nfts
    .map((nft: any, indx: number) => ({ nft, indx }))
    .slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  return (
    <PageButtons>
      {shownNFTs.map(({ nft, indx }: any) => (
        <NFTListItem key={indx} contract={contract} exhibit={exhibit} indx={indx} nft={nft} width={width} height={height} />
      ))}

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
          <div>
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
              console.log({ page, currentPage });
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
