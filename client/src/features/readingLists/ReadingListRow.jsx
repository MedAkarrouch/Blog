import { differenceInSeconds, format } from 'date-fns'
import { usersImagesUrl } from '../../utils/constants'
import { DateTime } from 'luxon'
import Table from '../../ui/Table'
import {
  HiMiniArrowRightCircle,
  HiOutlineBookmark,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineEllipsisVertical,
  HiOutlineHeart,
  HiPencil,
  HiTrash,
} from 'react-icons/hi2'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'

const Img = styled.img`
  width: 100%;
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  object-fit: contain;
  object-position: center;
`
const Title = styled(Link)`
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
const IconBtn = styled.button`
  justify-self: end;
  border: none;
  background: none;
  padding: 0.4rem;
  border-radius: 5px;

  & svg {
    color: var(--color-orange-400);
    fill: var(--color-orange-400);
    stroke-width: 2;
    width: 3rem;
    height: 3rem;
  }
  &:hover {
    background-color: var(--color-grey-100);
  }
`
const ReadingTime = styled.div``

function ReadingListRow({ post }) {
  return (
    <Table.Row>
      <Img
        loading="lazy"
        src={`${usersImagesUrl}/${post.author?.photo}`}
        alt=""
      />
      <div>
        <Category on-mobile={'true'}>#{post.category}</Category>
        <Title>{post.title}</Title>
        <ReadingTime>{post.readingTime}</ReadingTime>
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
      <IconBtn>
        <HiOutlineBookmark />
      </IconBtn>
    </Table.Row>
  )
}

export default ReadingListRow
