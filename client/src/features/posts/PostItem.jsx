import { styled } from "styled-components"
import Heading from "../../ui/Heading"
import { serverUrl } from "../../utils/constants"

const StyledPost = styled.li`
  border-radius: 20px;
  padding: 2rem 3rem;
  cursor: pointer;
  display: grid;
  grid-template-columns: 2fr 1.4fr;
  gap: 3rem;
  background-color: #fff;
  transition: transform 0.6s;
  position: relative;
  /* background-color: var( --color-grey-50); */
  background-color: var(--color-grey-50);
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  /* box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1); */
  /* box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1); */
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
  margin-top: 1rem;
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

const Category = styled.span`
  background-color: var(--color-grey-100);
  border-radius: 5px;
  padding: 0.5rem 1.25rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-orange-500);
  text-transform: capitalize;
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
`

function Post({ post }) {
  const { category, title, content, author } = post
  return (
    <StyledPost>
      <StyledContent>
        <div>
          <Category>{category}</Category>
        </div>
        <Title as="h3">{title}</Title>
        <Description>{content.substring(0, 20)}...</Description>
        <StyledProfile>
          <StyledProfileImg src={`${serverUrl}/img/users/${author.photo}`} />
          {/* <StyledProfileImg src="https://res.cloudinary.com/practicaldev/image/fetch/s--Q9Kwp-uC--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/609838/bc3ac0a6-8c2e-4c51-8fdd-83bd3d6ec159.jpeg" /> */}
          <StyledProfileDiv>
            <StyledProfileName>{author.fullName}</StyledProfileName>
            <StyledProfileDate>Aug 22</StyledProfileDate>
          </StyledProfileDiv>
        </StyledProfile>
      </StyledContent>
      <StyledCoverImg
        src="https://assets.website-files.com/62747a2d3bf3fca1c45b852a/63e0aa63d88ab8b68761c363_BFCM%20strategies.png"
        alt=""
      />
    </StyledPost>
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
