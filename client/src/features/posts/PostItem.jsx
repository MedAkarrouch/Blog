import { styled } from 'styled-components'
import Heading from '../../ui/Heading'
import { postsImagesUrl, usersImagesUrl } from '../../utils/constants'
import { Link } from 'react-router-dom'
import { DateTime } from 'luxon'
import {
  HiOutlineBookOpen,
  HiOutlineHeart,
  HiOutlineChatBubbleOvalLeft,
} from 'react-icons/hi2'
import { forwardRef } from 'react'

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
  a {
    &:focus {
      outline: none;
    }
  }
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
  font-size: 2rem;
  &::first-letter {
  }
`
const Description = styled.p`
  color: var(--color-grey-600);
  font-size: 1.5rem;
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
  /* justify-content: space-between; */
  flex-wrap: wrap;
  gap: 1rem 2rem;
  /* column-gap: 1rem; */
  /* row-gap: 1rem; */
  margin-bottom: 1.25rem;
`
const Category = styled.span`
  color: var(--color-orange-500);
  background-color: var(--color-grey-100);
  border-radius: 5px;
  padding: 0.5rem 1.25rem;
  font-size: 1.4rem;
  font-weight: 500;
  text-transform: capitalize;
`
const ReadingTime = styled(Category)`
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-grey-400);
  background-color: #fff;
  text-transform: none;
  & svg {
    font-size: 1.5rem;
  }
`
const Stats = styled.div`
  background-color: #fff;
  border-radius: 5px;
  padding: 0.5rem 1.25rem;
  display: flex;
  /* gap: 1.5rem; */
  /* gap: 0.25rem; */
  align-items: center;
  color: var(--color-grey-400);
  & div {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  & div:first-child {
    border-right: 2px solid var(--color-grey-100);
    padding-right: 1.5rem;
  }
  & div:last-child {
    padding-left: 1.5rem;
  }
  & span {
    font-size: 1.2rem;
    font-weight: 500;
  }
  & svg {
    font-size: 1.75rem;
    stroke-width: 1.5;
  }
`

const Post = forwardRef(function Post({ post }, ref) {
  const {
    category,
    summary,
    title,
    commentsCount,
    likesCount,
    coverImg,
    author,
    createdAt,
    readingTime,
    _id: postId,
  } = post
  return (
    <>
      <StyledPost ref={ref}>
        <StyledLink to={`/post/${postId}`}>
          <StyledContent>
            <StyledHeader>
              <Category>{category}</Category>
              <ReadingTime>
                <HiOutlineBookOpen />
                <span>{readingTime}</span>
              </ReadingTime>
              <Stats>
                <div>
                  <HiOutlineHeart />
                  <span>{likesCount || 0} Likes</span>
                </div>
                <div>
                  <HiOutlineChatBubbleOvalLeft />
                  <span>{commentsCount || 0} Comments</span>
                </div>
              </Stats>
            </StyledHeader>
            <Title as="h3">{title}</Title>
            <Description>{summary}</Description>
            <StyledProfile>
              <StyledProfileImg
                loading="lazy"
                src={`${usersImagesUrl}/${author.photo}`}
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
        </StyledLink>
      </StyledPost>
      <StyledLine />
    </>
  )
})

export default Post
