import styled, { css } from 'styled-components'
import { usersImagesUrl } from '../utils/constants'
import { Link, useNavigate } from 'react-router-dom'
import { HiMiniBars3 } from 'react-icons/hi2'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { useState } from 'react'
import { useLogout } from '../features/auth/useLogout'

const UserImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
  object-fit: cover;
  /* box-shadow: var(--shadow-sm); */
  border: 1px solid var(--color-grey-100);
  border-radius: 50px;
`
const StyledBurger = styled(HiMiniBars3)``

const StyledMenu = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  position: relative;
`
const Container = styled.button`
  background: none;
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid var(--color-grey-300);
  padding: 0.5rem;
  padding-left: 1.5rem;
  border-radius: 50px;
  cursor: pointer;
  position: relative;
  &:hover {
    box-shadow: var(--shadow-md);
  }
`
const MenuList = styled.div`
  position: absolute;
  bottom: -27rem;
  border-radius: 9px;
  right: 0;
  z-index: 100;
  background-color: #fff;
  box-shadow: var(--shadow-st);
  overflow: hidden;
  width: 21rem;
`
const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`
const Item = styled.li`
  font-size: 1.5rem;
  /* font-weight: 500; */
  color: var(--color-grey-600);
  border-radius: 5px;
  & a {
    display: block;
    padding: 1rem 1.5rem;
  }
  ${(props) =>
    !props.line &&
    css`
      &:not(:has(a)) {
        padding: 1rem 1.5rem;
      }
      cursor: pointer;
      &:hover {
        background-color: var(--color-orange-100);
        text-decoration: underline;
        color: var(--color-orange-400);
      }
    `}

  ${(props) =>
    props.line &&
    css`
      padding: 0.1rem 1.5rem;
      border-radius: 0;
      background-color: var(--color-grey-100);
    `}
`

// Account - Reading
function LoggedInUserMenu({ user }) {
  const navigate = useNavigate()
  const { isLoading, logout } = useLogout()
  const { photo } = user
  const [showMenu, setShowMenu] = useState(false)
  const menuListRef = useOutsideClick(closeMenuList)
  function closeMenuList() {
    setShowMenu(false)
  }

  return (
    <StyledMenu>
      <Container
        onClick={(e) => {
          e.stopPropagation()
          setShowMenu((show) => !show)
        }}
      >
        <StyledBurger />
        <UserImage src={`${usersImagesUrl}/${photo}`} />
      </Container>
      {showMenu && (
        <MenuList ref={menuListRef}>
          <List>
            <Item onClick={closeMenuList}>
              <Link to="/dashboard">Dashboard</Link>
            </Item>
            <Item onClick={closeMenuList}>
              <Link to="/new">Create post</Link>
            </Item>
            <Item onClick={closeMenuList}>
              <Link to="/readingList">Reading list</Link>
            </Item>
            <Item onClick={closeMenuList}>
              <Link to="/account">Account</Link>
            </Item>
            <Item line="true"></Item>
            <Item
              onClick={() =>
                logout(null, {
                  onSuccess: () => navigate('/'),
                  onSettled: closeMenuList,
                })
              }
            >
              Sign out
            </Item>
          </List>
        </MenuList>
      )}
    </StyledMenu>
  )
}

export default LoggedInUserMenu
