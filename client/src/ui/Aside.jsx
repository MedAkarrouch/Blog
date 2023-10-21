import styled, { css } from 'styled-components'
import { useUser } from '../features/auth/useUser'
import {
  HiOutlineChatBubbleOvalLeft,
  HiOutlineBookmark,
  HiOutlineShare,
  HiOutlineHeart,
  HiOutlineSquare2Stack,
  HiOutlineCheckCircle,
  HiOutlineEllipsisHorizontal,
  HiPencil,
  HiTrash,
} from 'react-icons/hi2'
import { useMemo, useRef, useState } from 'react'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { Link, useNavigate } from 'react-router-dom'
import { socialsLinks } from '../utils/constants'
import Modal, { useModalContext } from './Modal'
import ConfirmDelete from './ConfirmDelete'
import { useDeletePost } from '../features/posts/useDeletePost'
import LogInToContinue from './LogInToContinue'
import SpinnerMini from './SpinnerMini'
import { toast } from 'react-hot-toast'
import { useAddLike } from '../features/likes/useAddLike'
import { useRemoveLike } from '../features/likes/useRemoveLike'
import LikeButton from './LikeButton'

const StyledAside = styled.aside`
  padding: 5vh 0 0 4rem;
  position: relative;
  z-index: 10;
  @media screen and (max-width: 62.5em) {
    padding: 5vh 0 0 2rem;
  }
  @media screen and (max-width: 37.5em) {
    /* <=600px */
    padding: 5vh 0 0 0;
  }
`
const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  position: fixed;
  align-items: center;
  @media screen and (max-width: 37.5em) {
    /* <=600px */
    gap: 2rem;
  }
`
const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-grey-500);
  & span:not(:first-child) {
    font-size: 1.4rem;
    @media screen and (max-width: 28.15em) {
      /* <=450px */
      font-size: 1.2rem;
    }
  }
  position: relative;
`
const Icon = styled.span`
  cursor: pointer;
  & svg {
    stroke-width: 1.5;
    width: 2.75rem;
    height: 2.75rem;
    @media screen and (max-width: 37.5em) {
      width: 2.25rem;
      height: 2.25rem;
    }
  }
  ${(props) =>
    props.active &&
    css`
      & svg {
        fill: var(--color-orange-400);
        color: var(--color-orange-400);
      }
    `}
  /* color: var(--color-grey-400); */
  &:hover {
    color: var(--color-orange-400);
  }
  position: relative;
  /* background-color: var(--color-grey-50); */
  &:hover::after {
    ${(props) =>
      props['hide-title'] &&
      css`
        display: none;
      `}
    content: attr(title);
    position: absolute;
    background-color: var(--color-orange-400);
    color: #fff;
    text-align: center;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    z-index: 103;
    font-size: 1.3rem;
    top: 0;
    right: -13rem;
    /*  */
    /* top: -6rem; */
    /* right: -5rem; */
    width: 12rem;
    box-shadow: var(--shadow-sm);
  }
`
const SocialsList = styled.ul`
  overflow: hidden;
  z-index: 101;
  border-radius: 5px;
  position: absolute;
  background-color: #fff;
  right: -19rem;
  box-shadow: var(--shadow-st);
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.menu &&
    css`
      /* gap: 2rem; */
      right: -17rem;
      & a {
        display: flex;
        align-items: center;
        gap: 1rem;
      }
      & li {
        justify-content: unset !important;
        gap: 1rem;
      }
      & svg {
        color: var(--color-grey-400);
        width: 1.5rem;
        height: 1.5rem;
      }
    `}
`
const SocialsItem = styled.li`
  font-size: 1.4rem;
  cursor: pointer;
  &:hover {
    background-color: var(--color-grey-50);
  }

  &:not(:has(:link)) {
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & svg {
      font-size: 2rem;
    }
  }
  ${(props) =>
    props.linkcopied &&
    css`
      color: var(--color-green-400);
      & svg {
        stroke-width: 2;
      }
    `}
`
const SocialLink = styled(Link)`
  display: block;
  padding: 1.5rem 2rem;
`

function Aside({ post, commentsSection }) {
  const { user, isAuthenticated } = useUser()
  const navigate = useNavigate()
  const { isDeleting, deletePost } = useDeletePost()
  const [showList, setShowList] = useState('')
  const [linkCopied, setLinkcopied] = useState(false)
  const linkCopiedTimeout = useRef(null)
  const socialsListRef = useOutsideClick(() => setShowList(false), false)
  //
  const { commentsCount, likesCount } = post

  const asideRef = useRef(null)
  const { closeWindow } = useModalContext()

  const postBelongsToCurrentUser = post?.author._id === user?._id

  const handleCommentClick = () => {
    // console.log(commentsSection.current.getBoundingClientRect())
    window.scrollBy(0, commentsSection.current.getBoundingClientRect().top - 80)
  }
  const handleCopyLink = async () => {
    if (linkCopiedTimeout.current) clearTimeout(linkCopiedTimeout.current)
    try {
      await navigator.clipboard.writeText(window.location.href)
      setLinkcopied(true)
      const handler = () => setLinkcopied(false)
      linkCopiedTimeout.current = setTimeout(handler, 1000)
    } catch {
      toast.error('Something went wrong')
    }
  }

  return (
    <StyledAside ref={asideRef}>
      <List>
        <Modal.Open window={'confirm-window'}>
          <Item>
            <LikeButton post={post}>
              <Icon />
            </LikeButton>
            <span>{likesCount}</span>
          </Item>
        </Modal.Open>
        {!isAuthenticated && (
          <Modal.Window window={'confirm-window'}>
            <LogInToContinue />
          </Modal.Window>
        )}
        <Item>
          <Icon onClick={handleCommentClick} title="Jump to comments">
            <HiOutlineChatBubbleOvalLeft />
          </Icon>
          <span>{commentsCount}</span>
        </Item>
        <Modal.Open window={'confirm-window'}>
          <Item>
            <Icon title="Add to bookmark">
              <HiOutlineBookmark />
            </Icon>
          </Item>
        </Modal.Open>
        <Item>
          <Icon
            onClick={(e) => {
              e.stopPropagation()
              setShowList((list) =>
                list === 'socials-list' ? '' : 'socials-list',
              )
            }}
            hide-title={showList === 'socials-list' ? 'true' : ''}
            title="Share this article"
          >
            <HiOutlineShare />
          </Icon>
          {showList === 'socials-list' && (
            <SocialsList ref={socialsListRef}>
              <SocialsItem
                onClick={handleCopyLink}
                linkcopied={linkCopied ? 'true' : ''}
              >
                <span>{linkCopied ? 'Copied !' : 'Copy link'}</span>
                {linkCopied ? (
                  <HiOutlineCheckCircle />
                ) : (
                  <HiOutlineSquare2Stack />
                )}
              </SocialsItem>
              {socialsLinks.map((social) => (
                <SocialsItem key={social.social}>
                  <SocialLink
                    target="_blank"
                    to={social.link.replace(
                      'URL',
                      encodeURIComponent(
                        window.location.href,
                        // 'https://www.youtube.com/watch?v=yWDHYKTaRmo',
                      ),
                    )}
                  >
                    Share to {social.social}
                  </SocialLink>
                </SocialsItem>
              ))}
            </SocialsList>
          )}
        </Item>
        {postBelongsToCurrentUser && (
          <>
            <Item>
              <Icon
                onClick={(e) => {
                  e.stopPropagation()
                  setShowList((list) =>
                    list === 'menu-list' ? '' : 'menu-list',
                  )
                }}
                hide-title={showList === 'menu-list' ? 'true' : ''}
                title="Manage post"
              >
                <HiOutlineEllipsisHorizontal />
              </Icon>
              {showList === 'menu-list' && (
                <SocialsList ref={socialsListRef} menu="menu">
                  <SocialsItem>
                    <SocialLink to={`/edit/${post?._id}`}>
                      <HiPencil />
                      <span>Edit post</span>
                    </SocialLink>
                  </SocialsItem>
                  <Modal.Open window="delete-post">
                    <SocialsItem>
                      <HiTrash />
                      <span>Delete post</span>
                    </SocialsItem>
                  </Modal.Open>
                  {/* <SocialsItem>
                <SocialLink
                  target="_blank"
                  to={social.link.replace(
                    'URL',
                    encodeURIComponent(
                      window.location.href,
                      // 'https://www.youtube.com/watch?v=yWDHYKTaRmo',
                    ),
                  )}
                >
                  Share to {social.social}
                </SocialLink>
              </SocialsItem> */}
                </SocialsList>
              )}
            </Item>
            <Modal.Window window="delete-post">
              <ConfirmDelete
                resourceName={'post'}
                disabled={isDeleting}
                onConfirm={() =>
                  deletePost(post?._id, {
                    onSuccess: () => {
                      navigate('/', { replace: true })
                    },
                    onError: () => {
                      closeWindow()
                    },
                  })
                }
              />
            </Modal.Window>
          </>
        )}
      </List>
    </StyledAside>
  )
}
// function Aside({ post, commentsSection }) {
//   const { user, isAuthenticated } = useUser()
//   const navigate = useNavigate()
//   const { isDeleting, deletePost } = useDeletePost()
//   const [showList, setShowList] = useState('')
//   const [linkCopied, setLinkcopied] = useState(false)
//   const linkCopiedTimeout = useRef(null)
//   const socialsListRef = useOutsideClick(() => setShowList(false), false)
//   //
//   const { likes, commentsCount, likesCount } = post
//   const { addLike, isAddingLike } = useAddLike()
//   const { removeLike, isRemovingLike } = useRemoveLike()
//   const isLoading = isAddingLike || isRemovingLike

//   const hasUserAlreadyLikedPost = useMemo(() => {
//     return likes?.some((like) => like.user === user?._id)
//   }, [likesCount, isAuthenticated])

//   //z`
//   const asideRef = useRef(null)
//   const { closeWindow } = useModalContext()

//   const postBelongsToCurrentUser = post?.author._id === user?._id

//   const handleLikeClick = () => {
//     if (!isAuthenticated) return
//     if (hasUserAlreadyLikedPost) removeLike()
//     else if (!hasUserAlreadyLikedPost) addLike()
//   }

//   const handleCommentClick = () => {
//     // console.log(commentsSection.current.getBoundingClientRect())
//     window.scrollBy(0, commentsSection.current.getBoundingClientRect().top - 80)
//   }
//   const handleCopyLink = async () => {
//     if (linkCopiedTimeout.current) clearTimeout(linkCopiedTimeout.current)
//     try {
//       await navigator.clipboard.writeText(window.location.href)
//       setLinkcopied(true)
//       const handler = () => setLinkcopied(false)
//       linkCopiedTimeout.current = setTimeout(handler, 1000)
//     } catch {
//       toast.error('Something went wrong')
//     }
//   }

//   return (
//     <StyledAside ref={asideRef}>
//       <List>
//         <Modal.Open window={'confirm-window'}>
//           <Item>
//             <LikeButton post={post}>
//               <Icon />
//             </LikeButton>
//             {/* <Icon
//               title={
//                 hasUserAlreadyLikedPost ? 'Remove like' : 'Like this article'
//               }
//               active={hasUserAlreadyLikedPost ? 'true' : ''}
//               onClick={handleLikeClick}
//             >
//               {isLoading ? (
//                 <SpinnerMini color={'var(--color-orange-400)'} />
//               ) : (
//                 <HiOutlineHeart />
//               )}
//             </Icon> */}
//             <span>{likesCount}</span>
//           </Item>
//         </Modal.Open>
//         {!isAuthenticated && (
//           <Modal.Window window={'confirm-window'}>
//             <LogInToContinue />
//           </Modal.Window>
//         )}
//         <Item>
//           <Icon onClick={handleCommentClick} title="Jump to comments">
//             <HiOutlineChatBubbleOvalLeft />
//           </Icon>
//           <span>{commentsCount}</span>
//         </Item>
//         <Modal.Open window={'confirm-window'}>
//           <Item>
//             <Icon title="Add to bookmark">
//               <HiOutlineBookmark />
//             </Icon>
//           </Item>
//         </Modal.Open>
//         <Item>
//           <Icon
//             onClick={(e) => {
//               e.stopPropagation()
//               setShowList((list) =>
//                 list === 'socials-list' ? '' : 'socials-list',
//               )
//             }}
//             hide-title={showList === 'socials-list' ? 'true' : ''}
//             title="Share this article"
//           >
//             <HiOutlineShare />
//           </Icon>
//           {showList === 'socials-list' && (
//             <SocialsList ref={socialsListRef}>
//               <SocialsItem
//                 onClick={handleCopyLink}
//                 linkcopied={linkCopied ? 'true' : ''}
//               >
//                 <span>{linkCopied ? 'Copied !' : 'Copy link'}</span>
//                 {linkCopied ? (
//                   <HiOutlineCheckCircle />
//                 ) : (
//                   <HiOutlineSquare2Stack />
//                 )}
//               </SocialsItem>
//               {socialsLinks.map((social) => (
//                 <SocialsItem key={social.social}>
//                   <SocialLink
//                     target="_blank"
//                     to={social.link.replace(
//                       'URL',
//                       encodeURIComponent(
//                         window.location.href,
//                         // 'https://www.youtube.com/watch?v=yWDHYKTaRmo',
//                       ),
//                     )}
//                   >
//                     Share to {social.social}
//                   </SocialLink>
//                 </SocialsItem>
//               ))}
//             </SocialsList>
//           )}
//         </Item>
//         {postBelongsToCurrentUser && (
//           <>
//             <Item>
//               <Icon
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   setShowList((list) =>
//                     list === 'menu-list' ? '' : 'menu-list',
//                   )
//                 }}
//                 hide-title={showList === 'menu-list' ? 'true' : ''}
//                 title="Manage post"
//               >
//                 <HiOutlineEllipsisHorizontal />
//               </Icon>
//               {showList === 'menu-list' && (
//                 <SocialsList ref={socialsListRef} menu="menu">
//                   <SocialsItem>
//                     <SocialLink to={`/edit/${post?._id}`}>
//                       <HiPencil />
//                       <span>Edit post</span>
//                     </SocialLink>
//                   </SocialsItem>
//                   <Modal.Open window="delete-post">
//                     <SocialsItem>
//                       <HiTrash />
//                       <span>Delete post</span>
//                     </SocialsItem>
//                   </Modal.Open>
//                   {/* <SocialsItem>
//                 <SocialLink
//                   target="_blank"
//                   to={social.link.replace(
//                     'URL',
//                     encodeURIComponent(
//                       window.location.href,
//                       // 'https://www.youtube.com/watch?v=yWDHYKTaRmo',
//                     ),
//                   )}
//                 >
//                   Share to {social.social}
//                 </SocialLink>
//               </SocialsItem> */}
//                 </SocialsList>
//               )}
//             </Item>
//             <Modal.Window window="delete-post">
//               <ConfirmDelete
//                 resourceName={'post'}
//                 disabled={isDeleting}
//                 onConfirm={() =>
//                   deletePost(post?._id, {
//                     onSuccess: () => {
//                       navigate('/', { replace: true })
//                     },
//                     onError: () => {
//                       closeWindow()
//                     },
//                   })
//                 }
//               />
//             </Modal.Window>
//           </>
//         )}
//         {/* <Item>
//             <Icon onClick={handleShareClick} title="Share this article">
//               <HiOutlineShare />
//             </Icon>
//             {showList && (
//               <SocialsList ref={socialsListRef}>
//                 <SocialsItem
//                   onClick={handleCopyLink}
//                   linkCopied={linkCopied ? 'true' : ''}
//                 >
//                   <span>{linkCopied ? 'Copied !' : 'Copy link'}</span>
//                   {linkCopied ? (
//                     <HiOutlineCheckCircle />
//                   ) : (
//                     <HiOutlineSquare2Stack />
//                   )}
//                 </SocialsItem>
//                 {socialsLinks.map((social) => (
//                   <SocialsItem>
//                     <SocialLink
//                       target="_blank"
//                       to={social.link.replace(
//                         'URL',
//                         encodeURIComponent(
//                           window.location.href,
//                           // 'https://www.youtube.com/watch?v=yWDHYKTaRmo',
//                         ),
//                       )}
//                     >
//                       Share to {social.social}
//                     </SocialLink>
//                   </SocialsItem>
//                 ))}
//               </SocialsList>
//             )}
//           </Item> */}
//       </List>
//     </StyledAside>
//   )
// }

export default Aside
