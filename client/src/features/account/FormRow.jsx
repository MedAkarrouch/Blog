import styled from 'styled-components'
// import { HiMiniXCircle } from "react-icons/hi2"

const StyledFormRow = styled.div`
  display: grid;
  grid-template-columns: 24rem 1.2fr 1.2fr;
  align-items: center;
  gap: 2.4rem;
  padding: 1.2rem 0;
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  &:has(input[type='checkbox']) {
    grid-template-columns: 1fr;
  }
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    padding-bottom: 0;
  }
  &:has(h2),
  &:has(h3) {
    grid-template-columns: 1fr;
    padding-bottom: 2rem;
  }
`
const Label = styled.label`
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-700);
  cursor: pointer;
`
const Error = styled.div`
  display: flex;
  gap: 0.2rem;
  align-items: center;
  color: var(--color-red-500);
  font-weight: 500;
  font-size: 1.3rem;
`
function FormRow({ label, children, error }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  )
}

export default FormRow
