import styled from "styled-components"
const StyledMessage = styled.p`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
`
const StyledContent = styled.div`
  padding: 5rem 2rem;
  display: flex;
  /* flex-direction: column; */
  gap: 2rem;
  align-items: center;
  justify-content: center;
`
const StyledImg = styled.img`
  width: 4.5rem;
`

function ErrorMessage() {
  return (
    <StyledContent>
      <StyledImg alt="error emoji" src="/emojis/error.png" />
      <StyledMessage>
        Something went wrong, Please try again later.
      </StyledMessage>
    </StyledContent>
  )
}

export default ErrorMessage
