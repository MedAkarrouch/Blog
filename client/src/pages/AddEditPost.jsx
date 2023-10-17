import styled from 'styled-components'

import Editor from '../features/posts/Editor'
import FileInput from '../features/posts/FileInput'
import { useAutoTextareaResize } from '../hooks/useAutoTextareaResize'
import CreatePostFooter from '../features/posts/CreatePostFooter'
import { useState } from 'react'
import DropdownMenu from '../ui/DropdownMenu'
import { useAddNewPost } from '../features/posts/useAddNewPost'
import { postsImagesUrl } from '../utils/constants'
import { useUpdatePost } from '../features/posts/useUpdatePost'
import { toast } from 'react-hot-toast'

const StyledCreatePost = styled.form`
  height: calc(100vh - 7rem);
  overflow: hidden;
`
const SyledDiv = styled.div`
  height: 85%;
  border-radius: 8px;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 2rem 0;
  box-shadow: var(--shadow);
  max-width: 90rem;
  margin: 2rem auto;
  background-color: #fff;
  /* 1440px */
  @media screen and (min-width: 90em) {
    height: 80vh;
  }
`
const StyledTitle = styled.textarea`
  margin-top: 1.25rem;
  line-height: 1.1;
  width: 100%;
  resize: auto;
  overflow-y: hidden;
  outline: none;
  resize: none;
  border: none;
  font-weight: 600;
  font-size: 3rem;
  caret-color: auto;
  color: var(--color-grey-700);
  &::placeholder {
    color: currentColor;
  }
  &:focus {
    border: none;
    outline: none;
    outline-offset: none;
  }
  font-weight: 500;
  font-size: 2.5rem;
`
const StyledSummary = styled(StyledTitle)`
  line-height: 1.5;
  font-size: 2rem;
  margin-top: 0;
  margin-bottom: 1.25rem;
`
const Wrapper = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

function AddEditPost({ post, onEditMode = false }) {
  const { isAdding, addNewPost } = useAddNewPost()
  const { isUpdating, updatePost } = useUpdatePost()
  const isLoading = isAdding || isUpdating
  const titleRef = useAutoTextareaResize()
  const summaryRef = useAutoTextareaResize()
  const [coverImg, setCoverImg] = useState(
    post?.coverImg ? `${postsImagesUrl}/${post.coverImg}` : null,
  )
  const [title, setTitle] = useState(post?.title || '')
  const [summary, setSummary] = useState(post?.summary || '')
  const [content, setContent] = useState(post?.content || '')
  const [showList, setShowList] = useState(false)
  const [category, setCategory] = useState(post?.category || '')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onEditMode && !coverImg) return toast.error('Cover image is required')
    const data = new FormData()
    data.append('coverImg', coverImg)
    data.append('category', category)
    data.append('title', title)
    data.append('content', content)
    data.append('summary', summary)

    if (onEditMode) updatePost(data)
    if (!onEditMode) addNewPost(data)
  }
  const reset = () => {
    setShowList(false)
    setCategory(post.category)
    setCoverImg(`${postsImagesUrl}/${post.coverImg}`)
    setTitle(post.title)
    setSummary(post.summary)
    setContent(post.content)
  }
  const clear = () => {
    setShowList(false)
    setCategory('')
    setCoverImg(null)
    setTitle('')
    setSummary('')
    setContent('')
  }

  return (
    <StyledCreatePost onSubmit={handleSubmit}>
      <SyledDiv>
        <Wrapper>
          <DropdownMenu
            showList={showList}
            setShowList={setShowList}
            category={category}
            setCategory={setCategory}
          />
          <FileInput
            file={coverImg}
            setFile={setCoverImg}
            type="file"
            placeholder="Add a cover image"
          />
          <StyledTitle
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={titleRef}
            placeholder="New post title here..."
          />
          <StyledSummary
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            ref={summaryRef}
            placeholder="New post summary here..."
          />
        </Wrapper>
        <Editor content={content} setContent={setContent} />
      </SyledDiv>
      <CreatePostFooter
        onEditMode={onEditMode}
        isLoading={isLoading}
        reset={reset}
        clear={clear}
      />
    </StyledCreatePost>
  )
}

export default AddEditPost
