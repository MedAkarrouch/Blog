import styled, { css } from 'styled-components'
import { useUser } from '../features/auth/useUser'
import {
  HiOutlineHandThumbUp,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineBookmark,
  HiOutlineBookmarkSlash,
  HiOutlineShare,
  HiOutlineHeart,
  HiOutlineSquare2Stack,
  HiOutlineCheckCircle,
  HiOutlineEllipsisHorizontal,
  HiPencil,
  HiTrash,
} from 'react-icons/hi2'
import { useLikePost } from '../features/posts/useLikePost'
import { useRef, useState } from 'react'
import { usePostComments } from '../features/comments/usePostComments'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { Link, useNavigate } from 'react-router-dom'
import { socialsLinks } from '../utils/constants'
import Spinner from './Spinner'
import Modal, { useModalContext } from './Modal'
import ConfirmDelete from './ConfirmDelete'
import { useDeletePost } from '../features/posts/useDeletePost'

const StyledAside = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  /* background-color: var(--color-grey-50); */
  padding: 12rem 0 0 5rem;
  z-index: 10;
  /* padding: 9rem 0 0 2rem; */
  /* margin: 9rem 0 0 5rem; */
  /* height: 100%; */
`
const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`
const Item = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-grey-500);
  & span:not(:first-child) {
    font-size: 1.4rem;
  }
  position: relative;
`

const Icon = styled.span`
  cursor: pointer;
  & svg {
    stroke-width: 1.5;
    width: 2.75rem;
    height: 2.75rem;
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
    content: attr(title);
    position: absolute;
    background-color: var(--color-orange-400);
    color: #fff;
    text-align: center;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    z-index: 100;
    font-size: 1.3rem;
    top: 0;
    right: -13rem;
    width: 12rem;
    box-shadow: var(--shadow-sm);
  }
`

const SocialsList = styled.ul`
  border-radius: 5px;
  position: absolute;
  background-color: #fff;
  right: -19rem;
  box-shadow: var(--shadow-md);
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
    props.linkCopied &&
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
  const { user } = useUser()
  const navigate = useNavigate()
  const { totalComments, isLoading } = usePostComments()
  const { isDeleting, deletePost } = useDeletePost()
  const [showList, setShowList] = useState('')
  const [linkCopied, setLinkcopied] = useState(false)
  const linkCopiedTimeout = useRef(null)
  const socialsListRef = useOutsideClick(() => setShowList(false), false)
  const { likes } = post
  const { likePost } = useLikePost()
  const [hasUserAlreadyLikedPost, setHasUserAlreadyLikedPost] = useState(() =>
    likes?.likes?.some((like) => like.user === user?._id),
  )
  const [totalLikes, setTotalLikes] = useState(likes?.totalLikes || 0)
  const asideRef = useRef(null)
  const { closeWindow } = useModalContext()

  const postBelongsToCurrentUser = post?.author._id === user?._id

  const handleLikeClick = () => {
    setTotalLikes((likes) => (hasUserAlreadyLikedPost ? likes - 1 : likes + 1))
    setHasUserAlreadyLikedPost((like) => !like)
    likePost(null, {
      onError: () => {
        setHasUserAlreadyLikedPost(hasUserAlreadyLikedPost)
        setTotalLikes(totalLikes)
      },
    })
  }
  const handleCommentClick = () => {
    console.log(commentsSection.current.getBoundingClientRect())
    window.scrollBy(0, commentsSection.current.getBoundingClientRect().top - 80)
  }
  const handleCopyLink = async () => {
    if (linkCopiedTimeout.current) clearTimeout(linkCopiedTimeout.current)
    try {
      await navigator.clipboard.writeText(window.location.href)
      setLinkcopied(true)
      const handler = () => setLinkcopied(false)
      linkCopiedTimeout.current = setTimeout(handler, 1000)
    } catch {}
  }
  return (
    <StyledAside ref={asideRef}>
      {isLoading ? (
        <Spinner size={'4rem'} />
      ) : (
        <List>
          <Item>
            <Icon
              title={
                hasUserAlreadyLikedPost ? 'Remove like' : 'Like this article'
              }
              active={hasUserAlreadyLikedPost ? 'true' : ''}
              onClick={handleLikeClick}
            >
              <HiOutlineHeart />
            </Icon>
            <span>{totalLikes}</span>
          </Item>
          <Item>
            <Icon onClick={handleCommentClick} title="Jump to comments">
              <HiOutlineChatBubbleOvalLeft />
            </Icon>
            <span>{totalComments}</span>
          </Item>
          <Item>
            <Icon title="Add to bookmark">
              <HiOutlineBookmark />
            </Icon>
          </Item>
          <Item>
            <Icon
              onClick={(e) => {
                e.stopPropagation()
                setShowList((list) =>
                  list === 'socials-list' ? '' : 'socials-list',
                )
              }}
              title="Share this article"
            >
              <HiOutlineShare />
            </Icon>
            {showList === 'socials-list' && (
              <SocialsList ref={socialsListRef}>
                <SocialsItem
                  onClick={handleCopyLink}
                  linkCopied={linkCopied ? 'true' : ''}
                >
                  <span>{linkCopied ? 'Copied !' : 'Copy link'}</span>
                  {linkCopied ? (
                    <HiOutlineCheckCircle />
                  ) : (
                    <HiOutlineSquare2Stack />
                  )}
                </SocialsItem>
                {socialsLinks.map((social) => (
                  <SocialsItem>
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
                  title="Manage post"
                >
                  <HiOutlineEllipsisHorizontal />
                </Icon>
                {showList === 'menu-list' && (
                  <SocialsList ref={socialsListRef} menu="menu">
                    <SocialsItem>
                      <SocialLink to={`/edit/${post._id}`}>
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
          {/* <Item>
            <Icon onClick={handleShareClick} title="Share this article">
              <HiOutlineShare />
            </Icon>
            {showList && (
              <SocialsList ref={socialsListRef}>
                <SocialsItem
                  onClick={handleCopyLink}
                  linkCopied={linkCopied ? 'true' : ''}
                >
                  <span>{linkCopied ? 'Copied !' : 'Copy link'}</span>
                  {linkCopied ? (
                    <HiOutlineCheckCircle />
                  ) : (
                    <HiOutlineSquare2Stack />
                  )}
                </SocialsItem>
                {socialsLinks.map((social) => (
                  <SocialsItem>
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
          </Item> */}
        </List>
      )}
    </StyledAside>
  )
}

export default Aside
