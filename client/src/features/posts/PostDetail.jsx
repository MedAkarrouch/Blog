import styled from "styled-components"
import { postsImagesUrl, usersImagesUrl } from "../../utils/constants"
import Heading from "../../ui/Heading"
import { DateTime } from "luxon"

const StyledContent = styled.div`
  margin-top: 5rem;
  font-size: 2rem;
  /* color:; */
  color: var(--color-grey-500);
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
    color: var(--color-grey-700);
    &::first-letter {
      text-transform: capitalize;
    }
  }
  strong {
    color: var(--color-grey-600);
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
  max-width: 90rem;
  margin: 0 auto;
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
  font-size: 5rem;
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
  display: inline-block;
  background-color: var(--color-grey-100);
  border-radius: 5px;
  padding: 0.5rem 1.25rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-orange-500);
  text-transform: capitalize;
  text-align: left;
  margin-bottom: 2rem;
`
const StyledProfile = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

function PostDetail({ post }) {
  const { category, content, title, coverImg, author, createdAt } = post

  return (
    <Layout>
      <PostHeader>
        <Category>{category}</Category>
        <Title as="h1">{title}</Title>
      </PostHeader>
      <StyledProfile>
        {/* <UserImg alt="" src={`${usersImagesUrl}/${author.photo}`} /> */}
        <UserImg
          alt=""
          src="https://res.cloudinary.com/practicaldev/image/fetch/s--Q9Kwp-uC--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/609838/bc3ac0a6-8c2e-4c51-8fdd-83bd3d6ec159.jpeg"
        />
        <FlexBox>
          <UserName>{author.fullName}</UserName>
          <PostDate>{DateTime.fromISO(createdAt).toRelative()}</PostDate>
        </FlexBox>
      </StyledProfile>
      <PostImg alt="" src={`${postsImagesUrl}/${coverImg}`} />
      {/* <PostImg
        alt=""
        src="https://assets.website-files.com/62747a2d3bf3fca1c45b852a/63e0aa63d88ab8b68761c363_BFCM%20strategies.png"
      /> */}
      <StyledContent dangerouslySetInnerHTML={{ __html: content }} />
    </Layout>
  )
}

export default PostDetail
