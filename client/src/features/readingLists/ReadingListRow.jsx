import { differenceInSeconds, format } from 'date-fns'
import { postsImagesUrl, usersImagesUrl } from '../../utils/constants'
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
  border-radius: 1px;
  height: 7rem;
  /* width: 10rem; */
  object-fit: contain;
  object-position: center;
  /* align-self: center; */
`
const Title = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  display: inline-block;
  color: var(--color-grey-600);
  &:hover {
    color: var(--color-blue-950);
  }
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

  & svg {
    color: var(--color-orange-400);
    fill: var(--color-orange-400);
    stroke-width: 1.5;
    width: 2.5rem;
    height: 2.5rem;
  }
  &:hover {
    background-color: var(--color-grey-100);
  }
`

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  & p {
    font-size: 1rem;
    color: var(--color-grey-400);
  }
  & p:nth-child(3) {
    font-size: 1.5rem;
    color: var(--color-grey-300);
  }
`

function ReadingListRow({ post }) {
  return (
    <Table.Row>
      <Img loading="lazy" src={`${postsImagesUrl}/${post.coverImg}`} alt="" />
      <div>
        <Flex>
          <Category>#{post.category}</Category>
          <p>{post.readingTime}</p>
          <p> &bull; </p>
          <p>
            {differenceInSeconds(new Date(), new Date(post.createdAt)) <= 1
              ? 'Now'
              : DateTime.fromISO(post.createdAt).toRelative()}
          </p>
        </Flex>
        <Title to={`/post/${post._id}`}>{post.title}</Title>
      </div>
      <IconBtn>
        <HiOutlineBookmark />
      </IconBtn>
    </Table.Row>
  )
}

export default ReadingListRow
