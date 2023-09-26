import styled, { css } from "styled-components"
const PostLayout = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 1rem;
  row-gap: 0.7rem;
  padding: 1.5rem 0;
`
const UserImg = styled.img`
  border-radius: 50px;
  width: 3.5rem;
  height: 3.5rem;
`
const UserName = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-grey-900);
  text-transform: capitalize;
`
const PostDate = styled.div`
  font-size: 1rem;
  color: var(--color-grey-400);
  grid-column: 2/-1;
  grid-row-gap: 3/4;
  padding-left: 0.75rem;
`
const Comment = styled.p`
  grid-column: 2/-1;
  color: var(--color-grey-500);
  font-size: 1.4rem;
`
const Row = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.gap &&
    css`
      gap: ${props.gap};
    `}
`
const Content = styled.div`
  padding: 0.75rem 1rem;
  border: 1px solid var(--color-grey-50);
  box-shadow: var(--shadow-sm);
  background-color: var(--color-grey-50);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

PostLayout.UserImg = UserImg
PostLayout.UserName = UserName
PostLayout.PostDate = PostDate
PostLayout.Comment = Comment
PostLayout.Row = Row
PostLayout.Content = Content

export default PostLayout
