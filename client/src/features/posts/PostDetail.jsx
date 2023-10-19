import styled from 'styled-components'
import { postsImagesUrl, usersImagesUrl } from '../../utils/constants'
import Heading from '../../ui/Heading'
import { DateTime } from 'luxon'
import { differenceInSeconds } from 'date-fns'
import { HiOutlineBookOpen } from 'react-icons/hi2'

const StyledContent = styled.div`
  margin-top: 5rem;
  font-size: 1.8rem;
  /* font-size: 1.8rem; */
  /* color:; */
  color: var(--color-grey-600);
  & p {
    line-height: 1.9;
    &::first-letter {
      text-transform: capitalize;
    }
  }
  & p,
  li {
    /* color: var(--color-grey-500); */
  }
  & blockquote {
    position: relative;
    padding-left: 1rem;
    border-left: 5px solid #ccc;
  }
  & a {
    color: var(--color-blue-500);
    text-decoration: underline;
  }

  & h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--color-grey-800);
    &::first-letter {
      text-transform: capitalize;
    }
  }
  strong {
    color: var(--color-grey-700);
    &::first-letter {
      text-transform: capitalize;
    }
  }
  ol {
    padding-left: 5rem;
    & li {
      &::marker {
        color: var(--color-grey-700);
        font-weight: 500;
      }
      &::first-letter {
        text-transform: capitalize;
      }
    }
  }
  ul {
    list-style: unset;
    padding-left: 5rem;
    & li {
      &::marker {
        color: var(--color-grey-700);
      }
      &::first-letter {
        text-transform: capitalize;
      }
    }
  }
`
const Layout = styled.div`
  /* max-width: 90rem;
  margin: 0 auto; */
  display: flex;
  flex-direction: column;
  gap: 3rem;
`
const PostHeader = styled.div`
  /* text-align: center; */
`
const PostImg = styled.img`
  box-shadow: var(--shadow-sm);
  border-radius: 10px;
  max-height: 50vh;
  object-fit: cover;
`
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
`
const UserImg = styled.img`
  border-radius: 50px;
  width: 3.5rem;
  height: 3.5rem;
`
const Title = styled(Heading)`
  text-transform: capitalize;
  font-weight: 700;
  text-align: center;
  font-size: 3rem;
  text-transform: capitalize;
`
const UserName = styled.span`
  /* font-weight: 500; */
  /*  */
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-900);
  text-transform: capitalize;
`
const PostDate = styled.div`
  font-size: 1rem;
  color: var(--color-grey-400);
`
const Category = styled.span`
  color: var(--color-orange-500);
  background-color: var(--color-grey-100);
  border-radius: 5px;
  padding: 0.5rem 1.25rem;
  font-size: 1.2rem;
  font-weight: 500;
  text-transform: capitalize;
`
const StyledProfile = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`
const ReadingTime = styled(Category)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-grey-400);
  background-color: #fff;
  text-transform: none;
  & svg {
    font-size: 2rem;
  }
`

function PostDetail({ post }) {
  const { category, content, title, coverImg, author, readingTime, createdAt } =
    post
  console.log('Post detail')

  return (
    <Layout>
      <PostHeader>
        <StyledHeader>
          <Category>{category}</Category>
          <ReadingTime>
            <HiOutlineBookOpen />
            <span>{readingTime}</span>
          </ReadingTime>
        </StyledHeader>
        <Title as="h1">{title}</Title>
      </PostHeader>
      <StyledProfile>
        <UserImg alt="" src={`${usersImagesUrl}/${author.photo}`} />
        <FlexBox>
          <UserName>{author.fullName}</UserName>
          {/* <PostDate>{DateTime.fromISO(createdAt).toRelative()}</PostDate> */}
          <PostDate>
            {differenceInSeconds(new Date(), new Date(createdAt)) <= 1
              ? 'Now'
              : DateTime.fromISO(createdAt).toRelative()}
          </PostDate>
        </FlexBox>
      </StyledProfile>
      <PostImg alt="" src={`${postsImagesUrl}/${coverImg}`} />
      <StyledContent dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}

export default PostDetail
