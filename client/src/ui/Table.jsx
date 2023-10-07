import { createContext, useContext } from 'react'
import styled, { css } from 'styled-components'

const StyleTable = styled.div`
  border-radius: 7px;
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  box-shadow: var(--shadow-sm);
  /* overflow: hidden; */
  & div[role='rowheader'] {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }
  & footer {
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }
`
const CommonRow = styled.div`
  display: grid;
  padding: 1.5rem 1.2rem;
  grid-template-columns: ${(props) => props.columns};
  /* grid-template-columns: 7rem 2fr 1fr 0.7fr 0.7fr 0.1fr; */
  column-gap: 3rem;
  align-items: center;
  position: relative;
`
const StyledTableHeader = styled(CommonRow).attrs({ role: 'rowheader' })`
  background-color: var(--color-grey-50);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
`
const StyledTableRow = styled(CommonRow).attrs({ role: 'row' })`
  /* grid-template-columns: 7rem 2.1fr 1fr 0.7fr 0.7fr 0.1fr; */
  color: var(--color-grey-500);
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  & svg {
    /* stroke-width: 1.5;
    font-size: 2rem; */
  }
`
const StyledTableFooter = styled.footer`
  background-color: var(--color-grey-50);
  /* display: flex; */
  /* justify-content: center; */
  padding: 1.2rem;
  &:not(:has(*)) {
    display: none;
  }
`

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
  color: var(--color-grey-500);
`
const StyledBody = styled.div``

const TabelContext = createContext()
function Table({ columns, children }) {
  return (
    <TabelContext.Provider value={{ columns }}>
      <StyleTable role="table">{children}</StyleTable>
    </TabelContext.Provider>
  )
}

function Body({ data, render }) {
  if (!data?.length) return <Empty>No data to show at the moment</Empty>
  return <StyledBody>{data?.map(render)}</StyledBody>
}
function Header({ children }) {
  const { columns } = useContext(TabelContext)
  return <StyledTableHeader columns={columns}>{children}</StyledTableHeader>
}
function Row({ children }) {
  const { columns } = useContext(TabelContext)
  return <StyledTableRow columns={columns}>{children}</StyledTableRow>
}
function Footer({ children }) {
  return <StyledTableFooter>{children}</StyledTableFooter>
}

Table.Body = Body
Table.Header = Header
Table.Row = Row
Table.Footer = Footer

export default Table
