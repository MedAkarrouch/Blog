import styled from "styled-components"

const Input = styled.input.attrs({ autoComplete: "off" })`
  border: 1px solid var(--color-grey-300);
  background-color: #fff;
  border-radius: 5px;
  padding: 0.6rem 1.2rem;
  box-shadow: var(--shadow-sm);
  font-size: 1.4rem;
`

export default Input
