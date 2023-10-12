import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledLogo = styled.div`
  color: var(--color-orange-400);
  font-size: 4.5rem;
  text-transform: uppercase;
  font-weight: 900;
`
function Logo({ includeLink = true }) {
  return (
    <StyledLogo>
      {includeLink ? <Link to="/posts">Loor</Link> : 'Loor'}
    </StyledLogo>
  )
}

export default Logo
