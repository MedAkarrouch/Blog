import styled, { css } from "styled-components"
import { HiOutlineEllipsisHorizontal } from "react-icons/hi2"
import PostLayout from "../posts/PostLayout"
import { usersImagesUrl } from "../../utils/constants"
import { DateTime } from "luxon"
import { HiPencil, HiTrash } from "react-icons/hi2"
import Modal from "../../ui/Modal"
import ConfirmDelete from "../../ui/ConfirmDelete"
import { useState } from "react"
// const Layout = styled.div`
//   display: grid;
//   grid-template-columns: max-content 1fr;
//   column-gap: 1rem;
//   row-gap: 0.7rem;
//   padding: 1.5rem 0;
// `
// const UserImg = styled.img`
//   border-radius: 50px;
//   width: 3.5rem;
//   height: 3.5rem;
// `
// const UserName = styled.span`
//   font-size: 1.2rem;
//   font-weight: 500;
//   color: var(--color-grey-900);
//   text-transform: capitalize;
// `
// const PostDate = styled.div`
//   font-size: 1rem;
//   color: var(--color-grey-400);
//   grid-column: 2/-1;
//   grid-row-gap: 3/4;
//   padding-left: 0.75rem;
// `
// const Comment = styled.p`
//   grid-column: 2/-1;
//   color: var(--color-grey-500);
//   font-size: 1.4rem;
// `
// const Row = styled.div`
//   display: flex;
//   flex-direction: column;
//   ${(props) =>
//     props.gap &&
//     css`
//       gap: ${props.gap};
//     `}
// `
// const Content = styled.div`
//   padding: 0.75rem 1rem;
//   border: 1px solid var(--color-grey-50);
//   box-shadow: var(--shadow-sm);
//   background-color: var(--color-grey-50);
//   border-radius: 15px;
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `

const StyledRow = styled(PostLayout.Row)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

function PostComment({ postComment }) {
  const { comment, commentedAt, user } = postComment
  return (
    <PostLayout>
      <PostLayout.UserImg alt="" src={`${usersImagesUrl}/${user.photo}`} />
      <PostLayout.Content>
        <StyledRow>
          <PostLayout.UserName>{user.fullName}</PostLayout.UserName>
        </StyledRow>
        <PostLayout.Comment>{comment}</PostLayout.Comment>
      </PostLayout.Content>
      <PostLayout.PostDate>
        {DateTime.fromISO(commentedAt).toRelative()}
      </PostLayout.PostDate>
    </PostLayout>
  )
}

export default PostComment
