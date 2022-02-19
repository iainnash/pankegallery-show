import { css } from "@emotion/react";
import { useWalletButton } from "@zoralabs/simple-wallet-provider";
import { NavLink } from "./NavLink";

export const Header = () => {
  const {buttonAction, actionText} = useWalletButton();

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
          <a>About</a>
        </NavLink>
        <NavLink passHref href="/exhibit/drawing-machine">
          <a>drawing machine x4</a>
        </NavLink>
        <NavLink passHref href="/exhibit/og-flowers">
          <a>OG flowers</a>
        </NavLink>

        <a href="#" onClick={buttonAction}>{actionText}</a>
      </header>
    </>
  );
};
