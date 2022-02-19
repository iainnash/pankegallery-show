import Image from "next/image";
import { useEffect, useState } from "react";
import Pagination from "react-paginating";
import { PageButtons } from "../styles/components";

const PAGE_SIZE = 20

export const ListNFTs = ({ exhibit, contract, nfts, width, height }: any) => {
  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    if (window.location.hash) {
      setCurrentPage(parseInt(window.location.hash.substring(1)));
    }
  }, [typeof window !== 'undefined' ? window.location.hash : '']);
  const handlePageChange: any = (newPage: number | undefined, _: any) => {
    if (newPage) {
      setCurrentPage(newPage);
      if (typeof window !== 'undefined') {
        (window.location.hash as any) = newPage.toString();
      }
    }
  };
  return (
    <PageButtons>
      {nfts
        .map((nft: any, indx: number) => ({ nft, indx }))
        .slice((currentPage - 1) * PAGE_SIZE, (currentPage) * PAGE_SIZE)
        .map(({ nft, indx }: any) => (
          <a
            href={`/exhibit/${exhibit}/${indx}`}
            key={indx}
            style={{
              display: "inline-block",
              padding: "20px",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            <Image
              width={width}
              height={height}
              src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
              alt={nft.name}
            />
            <div style={{paddingTop: 10, fontSize: '1.1em', textDecoration: 'none'}}>{nft.name}</div>
          </a>
        ))}

      <Pagination
        className="pagination"
        total={nfts.length}
        limit={PAGE_SIZE}
        pageCount={(nfts.length / PAGE_SIZE) + 1}
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
              console.log({page, currentPage})
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
