import { styled } from 'styled-components'
import Heading from '../../ui/Heading'
import { serverUrl, postsImagesUrl } from '../../utils/constants'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'

const StyledPost = styled.li`
  border-radius: 20px;
  padding: 2rem 3rem;
  cursor: pointer;
  gap: 3rem;
  background-color: #fff;
  transition: transform 0.6s;
  position: relative;
  /* background-color: var( --color-grey-50); */
  background-color: var(--color-grey-50);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
`
const StyledLink = styled(Link)`
  display: grid;
  grid-template-columns: 2fr 1.4fr;
  gap: 2rem;
  /* 62.5em = 1000px */
  @media screen and (max-width: 62.5em) {
    grid-template-columns: 2fr 1.6fr;
  }
  /* 50em = 800px */
  @media screen and (max-width: 50em) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const StyledProfile = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: auto;
`
const StyledProfileImg = styled.img`
  border-radius: 50px;
  width: 3.5rem;
  height: 3.5rem;
`
const StyledProfileDiv = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledProfileName = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-grey-900);
  text-transform: capitalize;
`
const StyledProfileDate = styled.span`
  font-size: 1rem;
  color: var(--color-grey-400);
`
const Title = styled(Heading)`
  text-transform: capitalize;
  &::first-letter {
  }
`
const Description = styled.p`
  color: var(--color-grey-600);
  &::first-letter {
    text-transform: capitalize;
  }
`
const StyledCoverImg = styled.img`
  border-radius: 20px;
  width: 100%;
  max-height: 25rem;
  object-fit: cover;
  justify-self: center;
  align-self: start;
  @media screen and (max-width: 50em) {
    grid-row: 1/2;
    max-height: 35rem;
    border-radius: 10px;
  }
`
const StyledLine = styled.div`
  height: 2px;
  width: 20%; //20
  background-color: #eee;
  background-color: var(--color-grey-200);
  margin-left: 40%;
  border-radius: 50px;
`
const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 5rem;
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
const ReadingTime = styled(Category)`
  color: var(--color-grey-400);
  background-color: #fff;
  text-transform: none;
`

function Post({ post }) {
  const {
    category,
    summary,
    title,
    coverImg,
    author,
    createdAt,
    readingTime,
    _id: postId,
  } = post
  return (
    <>
      <StyledPost>
        <StyledLink to={`/post/${postId}`}>
          <StyledContent>
            <StyledHeader>
              <Category>{category}</Category>
              <ReadingTime>{readingTime}</ReadingTime>
            </StyledHeader>
            <Title as="h3">{title}</Title>
            <Description>{summary}</Description>
            <StyledProfile>
              {/* <StyledProfileImg
                src={`${serverUrl}/img/users/${author.photo}`}
              /> */}
              <StyledProfileImg
                loading="lazy"
                src="https://res.cloudinary.com/practicaldev/image/fetch/s--Q9Kwp-uC--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/609838/bc3ac0a6-8c2e-4c51-8fdd-83bd3d6ec159.jpeg"
              />
              <StyledProfileDiv>
                <StyledProfileName>{author.fullName}</StyledProfileName>
                <StyledProfileDate>
                  {DateTime.fromISO(createdAt).toRelative()}
                </StyledProfileDate>
              </StyledProfileDiv>
            </StyledProfile>
          </StyledContent>
          <StyledCoverImg
            loading="lazy"
            src={`${postsImagesUrl}/${coverImg}`}
            alt=""
          />
          {/* <StyledCoverImg
            src="https://assets.website-files.com/62747a2d3bf3fca1c45b852a/63e0aa63d88ab8b68761c363_BFCM%20strategies.png"
            alt=""
          /> */}
        </StyledLink>
      </StyledPost>
      <StyledLine />
    </>
  )
}

export default Post

// <div>
//   <StyledProfile>
//     <StyledProfileImg
//       src="https://res.cloudinary.com/practicaldev/image/fetch/s--Q9Kwp-uC--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/609838/bc3ac0a6-8c2e-4c51-8fdd-83bd3d6ec159.jpeg"
//       alt="dd"
//     />
//     <div>
//       <StyledOwnerName>Alex Scherkov</StyledOwnerName>
//       <StyledDate>Aug 29</StyledDate>
//     </div>
//   </StyledProfile>
// </div>
