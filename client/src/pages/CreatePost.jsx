import styled from "styled-components"

import Editor from "../features/posts/Editor"
import FileInput from "../features/posts/FileInput"
import { useAutoTextareaResize } from "../hooks/useAutoTextareaResize"
import CreatePostFooter from "../features/posts/CreatePostFooter"
import { useState } from "react"
import DropdownMenu from "../ui/DropdownMenu"
import { useAddNewPost } from "../features/posts/useAddNewPost"
const StyledCreatePost = styled.form`
  background-color: var(--color-grey-50);
  height: calc(100vh - 7rem);
  overflow: hidden;
`
const SyledDiv = styled.div`
  height: calc(100vh - 18rem);
  height: 86%;
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
  /* & * img {
    max-width: 50rem;
    margin: 0 auto;
  } */
`
const StyledTitle = styled.textarea`
  margin-top: 1.25rem;
  line-height: 1.1;
  width: 100%;
  resize: auto;
  overflow-y: none;
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
`
const StyledSummary = styled(StyledTitle)`
  font-weight: 500;
  font-size: 2rem;
`
const Wrapper = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

function CreatePost() {
  const { isLoading, addNewPost } = useAddNewPost()
  const titleRef = useAutoTextareaResize()
  const summaryRef = useAutoTextareaResize()
  const [coverImg, setCoverImg] = useState(null)
  const [title, setTitle] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [showList, setShowList] = useState(false)
  const [category, setCategory] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("coverImg", coverImg)
    data.append("category", category)
    data.append("title", title)
    data.append("content", content)
    data.append("summary", summary)

    addNewPost(data)
  }
  const clear = () => {
    setShowList(false)
    setCategory("")
    setCoverImg(null)
    setTitle("")
    setSummary("")
    setContent("")
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
      <CreatePostFooter clear={clear} />
    </StyledCreatePost>
  )
}

export default CreatePost
