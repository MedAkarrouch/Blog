import { differenceInSeconds } from 'date-fns'
import { postsImagesUrl } from '../../utils/constants'
import { DateTime } from 'luxon'
import Table from '../../ui/Table'
import {
  HiBookmark,
  HiMiniArrowRightCircle,
  HiOutlineEllipsisVertical,
} from 'react-icons/hi2'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { useRemovePostFromReadingList } from './useRemovePostFromReadingList'
import SpinnerMini from '../../ui/SpinnerMini'
import { forwardRef } from 'react'

const Img = styled.img`
  width: 100%;
  border-radius: 1px;
  height: 7rem;
  /* width: 10rem; */
  object-fit: contain;
  object-position: center;
  /* align-self: center; */
`
const Title = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
  display: inline-block;
  color: var(--color-grey-600);
  &::first-letter {
    text-transform: uppercase;
  }
`
const Category = styled.span`
  text-transform: capitalize;
  font-size: 1.3rem;
  font-weight: 500;
  font-size: 1.1rem;
  color: var(--color-orange-500);
  /* margin-bottom: 0.25rem; */
  margin-right: 1rem;
`
const IconBtn = styled.button`
  justify-self: end;
  border: none;
  background: none;
  padding: 0.4rem;
  border-radius: 5px;
  position: relative;

  /* & svg {
    color: var(--color-orange-400);
    fill: var(--color-orange-400);
    stroke-width: 1.5;
    width: 2.5rem;
    height: 2.5rem;
  } */
  &:hover {
    background-color: var(--color-grey-100);
  }
`
const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  & p {
    font-size: 1rem;
    color: var(--color-grey-400);
  }
  & p:nth-child(3) {
    font-size: 1.5rem;
    color: var(--color-grey-300);
  }
`
const ToggleIcon = styled(HiOutlineEllipsisVertical)`
  stroke-width: 1.5;
  width: 2.4rem;
  height: 2.4rem;
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

const ReadingListRow = forwardRef(function ReadingListRow(
  { post, isMenuOpen, openMenu, closeMenu },
  ref,
) {
  const { isLoading, removePostFromReadingList } =
    useRemovePostFromReadingList()
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

            <OptionsItem
              onClick={() =>
                removePostFromReadingList(post._id, { onSettled: closeMenu })
              }
            >
              {isLoading ? (
                <SpinnerMini color={'var(--color-orange-400)'} />
              ) : (
                <HiBookmark />
              )}
              <span>Remove from list</span>
            </OptionsItem>
          </OptionsList>
        </OptionsMenu>
      )}
      <Img loading="lazy" src={`${postsImagesUrl}/${post.coverImg}`} alt="" />
      <div>
        <Flex>
          <Category>#{post.category}</Category>
          <p>
            posted{' '}
            {differenceInSeconds(new Date(), new Date(post.createdAt)) <= 1
              ? 'Now'
              : DateTime.fromISO(post.createdAt).toRelative()}
          </p>
          <p> &bull; </p>
          <p>{post.readingTime}</p>
        </Flex>
        <Title to={`/post/${post._id}`}>{post.title}</Title>
      </div>
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

export default ReadingListRow
