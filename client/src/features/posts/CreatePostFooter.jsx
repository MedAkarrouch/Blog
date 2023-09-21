import styled, { css } from "styled-components"
import SpinnerMini from "../../ui/SpinnerMini"
const Button = styled.button`
  display: block;
  border: none;
  padding: 1rem 2rem;
  border-radius: 5px;
  background-color: var(--color-orange-500);
  color: #fff;
  font-weight: 500;
  font-size: 1.5rem;
  &:hover {
    background-color: var(--color-orange-600);
  }
  ${(props) =>
    props.role === "clear" &&
    css`
      background-color: transparent;
      color: var(--color-grey-700);
      &:hover {
        background-color: var(--color-grey-200);
      }
    `}
`

const StyledFooter = styled.div`
  max-width: 90rem;
  margin: 0 auto;
  display: flex;
  gap: 2rem;
  align-items: center;
`

function CreatePostFooter({ isLoading, clear }) {
  return (
    <StyledFooter>
      <Button>
        {isLoading ? <SpinnerMini publish={"true"} /> : "Publish"}
      </Button>
      <Button type="button" role="clear" onClick={clear}>
        Clear
      </Button>
    </StyledFooter>
  )
}

export default CreatePostFooter
