import { css } from '@emotion/react'

export const Footer = () => {
  return (
    <footer css={css`
      height: var(--footer-height);
      border-top: var(--border-black);
      a {
        text-decoration: none;
      }
    `}>
      <a target="_blank" href="https://officeimpart.com" className="zora-branding">office impart</a>
      {/* <a target="_blank" href="https://docs.zora.co">Powered by Zora</a> */}
    </footer>
  )
}
