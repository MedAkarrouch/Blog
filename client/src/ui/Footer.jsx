import styled, { css } from 'styled-components'
const StyledFooter = styled.footer`
  padding: 3rem 2rem;
  height: 10rem;
  padding-bottom: 2rem;
  /* ${(props) => props.home === 'true' && css``} */
  /* text-align: center; */
  display: grid;
  grid-template-columns: 1fr;
  align-content: end;
  justify-items: center;
  align-items: center;
  gap: 1.5rem 2.5rem;
  color: var(--color-grey-400);
  font-size: 1.2rem;
  margin-top: auto;
`
const List = styled.ul`
  display: flex;
  gap: 4rem;
  @media screen and (max-width: 31.25em) {
    gap: 1.5rem;
  }
`
const Item = styled.li`
  cursor: pointer;
  &:hover {
    color: var(--color-grey-500);
  }
`

function Footer({ home = false }) {
  return (
    <StyledFooter home={home ? 'true' : ''}>
      <List>
        <Item>About</Item>
        <Item>Terms of Use</Item>
        <Item>Privacy Policy</Item>
        <Item>Careers</Item>
        <Item>Help</Item>
        <Item>Contact Us</Item>
      </List>
      <p>
        &copy; Copyright 2023 by <span>Mohamed Akarrouch</span>. All rights
        reserved.
      </p>
    </StyledFooter>
  )
}

export default Footer
