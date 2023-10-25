import styled from 'styled-components'
import ErrorMessage from '../ui/ErrorMessage'
import { Link } from 'react-router-dom'
const Container = styled.div`
  display: grid;
  grid-template-columns: max-content;
  justify-content: center;
  align-content: center;
  min-height: 100vh;
  justify-items: center;
  padding: 3rem 2rem;
  row-gap: 1rem;
`
const LinkBtn = styled(Link)`
  /* border: 1px solid var(--color-orange-100); */
  cursor: pointer;
  padding: 1.25rem 2.5rem;
  display: block;
  background-color: var(--color-orange-400);
  font-weight: 500;
  color: #fff;
  border-radius: 7px;
  /* justify-self: center; */
  /* font-size: 1.6rem; */
`
const H1 = styled.h1`
  font-size: 3rem;
`
const P = styled.p`
  font-size: 1.8rem;
  margin-bottom: 2rem;
`
const StyledImg = styled.img`
  width: 5rem;
`

function PageNotFound() {
  return (
    <Container>
      {/* <ErrorMessage /> */}
      <StyledImg alt="error emoji" src="/emojis/error.png" />
      <H1>Sorry, this page isn't available.</H1>
      <P>
        The link you followed may be broken, or the page may have been removed.
      </P>
      <LinkBtn to="/">Return to home page</LinkBtn>
    </Container>
  )
}

export default PageNotFound
