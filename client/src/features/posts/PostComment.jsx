import styled, { css } from "styled-components"
import PostLayout from "./PostLayout"
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
function PostComment({ post }) {
  return (
    <PostLayout>
      <PostLayout.UserImg
        alt=""
        src="https://res.cloudinary.com/practicaldev/image/fetch/s--Q9Kwp-uC--/c_fill,f_auto,fl_progressive,h_90,q_auto,w_90/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/609838/bc3ac0a6-8c2e-4c51-8fdd-83bd3d6ec159.jpeg"
      />
      <PostLayout.Content>
        <PostLayout.Row>
          <PostLayout.UserName>Alex Johnson</PostLayout.UserName>
        </PostLayout.Row>
        <PostLayout.Comment>
          Whenever you learn programming in a truly passionate way, there is a
          lot of fun waiting, and this is why programming is the heart of
          digital earth.
        </PostLayout.Comment>
      </PostLayout.Content>
      <PostLayout.PostDate>1 hour ago</PostLayout.PostDate>
    </PostLayout>
  )
}

export default PostComment
