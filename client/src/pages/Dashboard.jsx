import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineEllipsisVertical,
  HiOutlineHeart,
} from 'react-icons/hi2'
import styled, { css } from 'styled-components'
import { useUserPosts } from '../features/posts/useUserPosts'
import Spinner from '../ui/Spinner'
import { postsImagesUrl } from '../utils/constants'
import { DateTime } from 'luxon'
import { differenceInSeconds, format } from 'date-fns'

const Table = styled.div`
  border-radius: 7px;
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  box-shadow: var(--shadow-sm);
  overflow: hidden;
`

const TableRow = styled.div`
  /* padding: 1.2rem 2.4rem; */
  /* padding: 0.6rem 1.2rem; */
  padding: 1.2rem;
  display: grid;
  /* grid-template-columns: 7rem 2.1fr 1fr 0.7fr 0.7fr 0.1fr; */
  grid-template-columns: 7rem 2fr 1fr 0.7fr 0.7fr 0.1fr;
  column-gap: 3rem;
  align-items: center;
  color: var(--color-grey-500);
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  & svg {
    stroke-width: 1.5;
    font-size: 2rem;
  }
`
const TableHeader = styled(TableRow)`
  background-color: var(--color-grey-50);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding-top: 1.2rem;
  padding-bottom: 1.2rem;
`
const Container = styled.div`
  max-width: 95rem;
  margin: 10rem auto;
`
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
    /* font-size: 2rem; */
    /* stroke-width: 2; */
  }
`
const ToggleIcon = styled(HiOutlineEllipsisVertical)`
  cursor: pointer;
  justify-self: end;
`
const Title = styled.div`
  font-weight: 500;
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

function Dashboard() {
  const { isLoading, count, posts } = useUserPosts()
  console.log(isLoading, count, posts)
  return (
    <Container>
      {isLoading ? null : (
        <Table>
          {/* <TableRow>
            <Img
              src="http://localhost:8000/img/posts/cover-img-64fc96ce7db8ffcc0ad8875c-1695904243328.jpeg"
              alt=""
            />
            <div>
              <p>How to be rich in 5 years</p>
              <p>published on the 10th september</p>
            </div>
            <Flex>
              <div>
                <HiOutlineHeart />
                <span>10</span>
              </div>
              <div>
                <HiOutlineChatBubbleOvalLeft />
                <span>19</span>
              </div>
            </Flex>
            <div>
              <HiOutlineEllipsisVertical />
            </div>
          </TableRow> */}
          <TableHeader>
            <div></div>
            <div>title</div>
            <div>category</div>
            <div>date</div>
            <div>stats</div>
            <div></div>
          </TableHeader>
          {posts?.map((post) => (
            <TableRow key={post._id}>
              <Img src={`${postsImagesUrl}/${post.coverImg}`} alt="" />
              <Title>{post.title}</Title>
              <Category>{post.category}</Category>
              <Dates>
                <p>
                  {differenceInSeconds(new Date(), new Date(post.createdAt)) <=
                  1
                    ? 'Now'
                    : DateTime.fromISO(post.createdAt).toRelative()}
                </p>
                <p>{format(new Date(post.createdAt), 'MMM dd yyyy')}</p>
                {/* <p>Jul 10 2023 </p> */}
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
              <ToggleIcon />
              {/* <HiOutlineEllipsisVertical /> */}
            </TableRow>
          ))}
        </Table>
      )}
    </Container>
  )
}

export default Dashboard
