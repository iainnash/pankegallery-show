import { css } from "@emotion/react";
import { NavLink } from "./NavLink";
import { ConnectKitButton } from "connectkit";

export const Header = () => {
  // const {buttonAction, actionText} = useWalletButton();

  return (
    <>
      <header
        css={css`
          height: var(--header-height);
          position: sticky;
          top: 0;
          z-index: var(--header-z);
          border-bottom: var(--border-black);
          background-color: var(--white);
        `}
      >
        <NavLink passHref href="/">
          <>About</>
        </NavLink>
        <NavLink passHref href="/exhibit/drawing-machine">
          <>drawing machine x4</>
        </NavLink>
        <NavLink passHref href="/exhibit/og-flowers">
          <>OG flowers</>
        </NavLink>

        <ConnectKitButton />
        {/* <a href="#" onClick={buttonAction}>{actionText}</a> */}
      </header>
    </>
  );
};
