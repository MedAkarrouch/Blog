import styled from "styled-components"
import { usersImagesUrl } from "../utils/constants"
const UserImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-grey-100);
  border-radius: 50px;
`
function LoggedInUserMenu({ user }) {
  const { photo, fullName } = user
  return (
    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
      <p>{fullName}</p>
      <UserImage src={`${usersImagesUrl}/${photo}`} />
    </div>
  )
}

export default LoggedInUserMenu
