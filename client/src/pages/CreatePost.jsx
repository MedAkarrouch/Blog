import styled from "styled-components"

import Editor from "../features/posts/Editor"
import FileInput from "../features/posts/FileInput"
import { useAutoTextareaResize } from "../hooks/useAutoTextareaResize"
import CreatePostFooter from "../features/posts/CreatePostFooter"
import { useState } from "react"
import DropdownMenu from "../ui/DropdownMenu"
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
  line-height: 1.1;
  width: 100%;
  resize: auto;
  overflow-y: none;
  outline: none;
  resize: none;
  border: none;
  font-weight: 600;
  font-size: 4rem;
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
const Wrapper = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

function CreatePost() {
  const ref = useAutoTextareaResize()
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [showList, setShowList] = useState(false)
  const [categorie, setCategorie] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const clear = () => {
    setShowList(false)
    setCategorie("")
    setFile(null)
    setTitle("")
    setContent("")
  }
  return (
    <StyledCreatePost onSubmit={handleSubmit}>
      <SyledDiv>
        <Wrapper>
          <DropdownMenu
            showList={showList}
            setShowList={setShowList}
            categorie={categorie}
            setCategorie={setCategorie}
          />
          <FileInput
            file={file}
            setFile={setFile}
            type="file"
            placeholder="Add a cover image"
          />
          <StyledTitle
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ref={ref}
            placeholder="New post title here..."
          />
        </Wrapper>
        <Editor content={content} setContent={setContent} />
      </SyledDiv>
      <CreatePostFooter clear={clear} />
    </StyledCreatePost>
  )
}

export default CreatePost
