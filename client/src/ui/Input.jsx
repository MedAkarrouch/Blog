import styled from "styled-components"

const Input = styled.input.attrs({ autoComplete: "off" })`
  color: var(--color-grey-600);
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`

export default Input
