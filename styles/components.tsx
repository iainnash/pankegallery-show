import styled from '@emotion/styled'

export const PageWrapper = styled.section`
  margin: 0 auto;
  width: 100%;
  max-width: var(--content-width-md);
  position: relative;
  padding:
    var(--space-sm)
    var(--space-sm)
    var(--space-lg);
`

export const PageButtons = styled.section`
  button {
    border-radius: 6px;
    border: none;
    cursor: pointer;
    padding: 6px;
    margin: 0;
    font-size: 18px;
  }
  .pagination {
    text-align: center;
  }
`
