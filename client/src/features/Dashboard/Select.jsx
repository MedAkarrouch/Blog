import styled, { css } from 'styled-components'
const StyledSelect = styled.select`
  display: flex;
  margin-left: auto;
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-200);
  ${(props) =>
    props.page === 'dashboard' &&
    css`
      margin-top: 5rem;
      margin-bottom: 2rem;
    `}
  /* border: 1px solid
    ${(props) =>
    props.type === 'white'
      ? 'var(--color-grey-100)'
      : 'var(--color-grey-300)'}; */
  border-radius: 5px;
  background-color: #fff;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`

function Select({ options, page, onChange }) {
  return (
    <StyledSelect page={page} onChange={onChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  )
}

export default Select
