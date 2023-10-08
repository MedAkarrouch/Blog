import { differenceInSeconds, format } from 'date-fns'
import { postsImagesUrl } from '../utils/constants'
import { DateTime } from 'luxon'
import Table from './Table'
import {
  HiMiniArrowRightCircle,
  HiOutlineArrowLongRight,
  HiOutlineArrowRightCircle,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineEllipsisVertical,
  HiOutlineHeart,
  HiPencil,
  HiTrash,
} from 'react-icons/hi2'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import Modal from './Modal'
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
  gap: 2rem;
  align-items: center;
  ${(props) =>
    props.gap &&
    css`
      gap: ${props.gap};
    `}
  & svg {
    stroke-width: 1.5;
    font-size: 2rem;
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
  /* text-transform: capitalize; */
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

const Icon = styled.span`
  stroke-width: 1.5;
  font-size: 2rem;
`

const DashboardRow = forwardRef(function DashboardRow(
  { post, isMenuOpen, openMenu, closeMenu },
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
      <Flex>
        <Flex gap=".5rem">
          <HiOutlineHeart />
          <span>{post.likes.totalLikes}</span>
        </Flex>
        <Flex gap=".5rem">
          <HiOutlineChatBubbleOvalLeft />
          <span>{post.comments.totalComments}</span>
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
