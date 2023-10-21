import { differenceInSeconds, format } from 'date-fns'
import { postsImagesUrl } from '../../utils/constants'
import { DateTime } from 'luxon'
import Table from '../../ui/Table'
import {
  HiMiniArrowRightCircle,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineEllipsisVertical,
  HiOutlineHeart,
  HiPencil,
  HiTrash,
} from 'react-icons/hi2'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import Modal from '../../ui/Modal'
import { forwardRef } from 'react'

const Img = styled.img`
  width: 100%;
  border-radius: 1px;
  /* height: 5rem; */
  max-height: 7rem;
  object-fit: contain;
  /* object-fit: cover; */
  object-position: center;
`
const Flex = styled.div`
  display: flex;
  gap: 0.75rem 1.5rem;
  align-items: center;
  flex-wrap: wrap;
  ${(props) =>
    props.gap &&
    css`
      gap: ${props.gap};
    `}
  & svg {
    stroke-width: 1.5;
    font-size: 2rem;
  }
  & span {
    font-size: 1.2rem;
    font-weight: 500;
  }
`
const ToggleIcon = styled(HiOutlineEllipsisVertical)`
  stroke-width: 1.5;
  width: 2.4rem;
  height: 2.4rem;
`
const Title = styled.div`
  /* font-weight: 500; */
  &::first-letter {
    text-transform: uppercase;
  }
`
const Category = styled.p`
  text-transform: capitalize;
  font-size: 1.3rem;
  ${(props) =>
    props['on-mobile'] &&
    css`
      font-size: 1.1rem;
      font-weight: 500;
      color: var(--color-orange-500);
      margin-bottom: 0.25rem;
    `}
`
const Dates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  & p:first-child {
    font-weight: 500;
    font-size: 1.3rem;
  }
  & p:last-child {
    font-size: 1.2rem;
  }
  ${(props) =>
    props['on-mobile'] &&
    css`
      flex-direction: row;
      margin-top: 0.25rem;
      align-items: center;
      & p:first-child,
      p:last-child {
        /* font-weight: 400; */
        font-size: 1rem;
        font-weight: 500;
        color: var(--color-grey-600);
      }
    `}
`

const OptionsMenu = styled.menu`
  position: absolute;
  background-color: #fff;
  top: 75%;
  right: 1.5rem;
  border: 1px solid var(--color-grey-50);
  border-radius: 7px;
  box-shadow: var(--shadow-md);
  z-index: 10;
`
const OptionsList = styled.ul`
  display: flex;
  flex-direction: column;
`
const OptionsItem = styled.li`
  cursor: pointer;
  display: flex;
  gap: 1.6rem;
  align-items: center;
  &:not(:has(:link)) {
    padding: 1.2rem 2.4rem;
  }
  /* color: var(--color-grey-700); */
  color: var(--color-grey-700);
  span {
    font-size: 1.4rem;
  }
  &:hover {
    background-color: var(--color-grey-50);
  }
  & svg {
    color: var(--color-grey-400);
    /* color: var(--color-grey-300); */
    width: 1.5rem;
    height: 1.5rem;
  }
`
const OptionsLink = styled(Link)`
  display: block;
  padding: 1.2rem 2.4rem;
  display: flex;
  align-items: center;
  gap: 1.6rem;
`
const IconBtn = styled.button`
  justify-self: end;
  border: none;
  background: none;
  padding: 0.4rem;
  border-radius: 5px;
  &:hover {
    background-color: var(--color-grey-100);
  }
`

const DashboardRow = forwardRef(function DashboardRow(
  { post, isMenuOpen, openMenu, closeMenu, screen },
  ref,
) {
  return (
    <Table.Row>
      {isMenuOpen && (
        <OptionsMenu ref={ref}>
          <OptionsList>
            <OptionsItem>
              <OptionsLink to={`/post/${post._id}`}>
                <HiMiniArrowRightCircle />
                <span>Go to post</span>
              </OptionsLink>
            </OptionsItem>
            <OptionsItem>
              <OptionsLink to={`/edit/${post._id}`}>
                <HiPencil />
                <span>Edit</span>
              </OptionsLink>
            </OptionsItem>
            <Modal.Open window={post._id}>
              <OptionsItem>
                <HiTrash />
                <span>Delete</span>
              </OptionsItem>
            </Modal.Open>
          </OptionsList>
        </OptionsMenu>
      )}
      <Img loading="lazy" src={`${postsImagesUrl}/${post.coverImg}`} alt="" />
      {screen === 'desktop' ? (
        <>
          <Title>{post.title}</Title>
          <Category>{post.category}</Category>
          <Dates>
            <p>
              {differenceInSeconds(new Date(), new Date(post.createdAt)) <= 1
                ? 'Now'
                : DateTime.fromISO(post.createdAt).toRelative()}
            </p>
            <p>{format(new Date(post.createdAt), 'MMM dd yyyy')}</p>
          </Dates>
        </>
      ) : screen === 'tablet' ? (
        <>
          <div>
            <Category on-mobile={'true'}>#{post.category}</Category>
            <Title>{post.title}</Title>
          </div>
          <Dates>
            <p>
              {differenceInSeconds(new Date(), new Date(post.createdAt)) <= 1
                ? 'Now'
                : DateTime.fromISO(post.createdAt).toRelative()}
            </p>
            <p>{format(new Date(post.createdAt), 'MMM dd yyyy')}</p>
          </Dates>
        </>
      ) : (
        <div>
          <Category on-mobile={'true'}>#{post.category}</Category>
          <Title>{post.title}</Title>
          <Dates on-mobile={'true'}>
            <p>{format(new Date(post.createdAt), 'MMM dd yyyy')}</p>
            <p>
              (
              {differenceInSeconds(new Date(), new Date(post.createdAt)) <= 1
                ? 'Now'
                : DateTime.fromISO(post.createdAt).toRelative()}
              )
            </p>
          </Dates>
        </div>
      )}
      <Flex>
        <Flex gap=".5rem">
          <HiOutlineHeart />
          <span>{post.likesCount || 0}</span>
          {/* <span>74610</span> */}
        </Flex>
        <Flex gap=".5rem">
          <HiOutlineChatBubbleOvalLeft />
          <span>{post.commentsCount || 0}</span>
          {/* <span>68901</span> */}
        </Flex>
      </Flex>
      <IconBtn
        onClick={(e) => {
          e.stopPropagation()
          openMenu()
        }}
      >
        <ToggleIcon />
      </IconBtn>
    </Table.Row>
  )
})

export default DashboardRow
