import styled from "styled-components"
// import { HiMiniXCircle } from "react-icons/hi2"

const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`
const Label = styled.label`
  font-weight: 500;
  font-size: 1.5rem;
  color: var(--color-grey-700);
`
// const Error = styled.div`
//   display: flex;
//   gap: 0.2rem;
//   align-items: center;
//   color: var(--color-red-500);
//   font-weight: 500;
//   font-size: 1.3rem;
// `
// const ErrorIcon = styled(HiMiniXCircle)`
//   width: 1.5rem;
//   height: 1.5rem;
// `

function FormRow({ label, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
    </StyledFormRow>
  )
}

export default FormRow
