import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled, { css } from 'styled-components'

const Button = styled.button.attrs({ type: 'button' })`
  background-color: #fff;
  border: 3px solid var(--color-grey-100);
  padding: 0.75rem 1.5rem;
  padding: 0.75rem 1.25rem;
  /* padding: 0.75rem 2.25rem; */
  display: block;

  color: var(--color-grey-700);
  font-weight: 500;
  font-size: 1.5rem;
  border-radius: 5px;
  ${(props) =>
    props.mode &&
    css`
      width: 20rem;
      text-align: left;
    `}
  ${(props) =>
    props.variation !== 'danger' &&
    css`
      &:hover {
        background-color: var(--color-grey-100);
      }
    `}

  ${(props) =>
    props.variation === 'danger' &&
    css`
      color: var(--color-red-500);
      border: none;
      &:hover {
        background-color: var(--color-grey-50);
      }
    `}
`
const Image = styled.img`
  width: 100%;
  display: block;
`
const Aside = styled.div`
  margin-top: 2rem;
  background-color: yellow;
  width: 15rem;
  position: relative;
`

function FileInput({ file, setFile }) {
  // const [file, setFile] = useState(null) // Change to a single file state

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    maxFiles: 1, // Limit to one file
    onDrop: (acceptedFiles) => {
      // setCoverImg(acceptedFiles[0])
      setFile(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0]),
        }),
      )
    },
  })

  useEffect(() => {
    return () => {
      if (!file) return
      URL.revokeObjectURL(file.preview)
    }
  }, [file])

  return (
    <div>
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div {...getRootProps({ className: 'dropzone' })}>
          <input {...getInputProps()} />
          <Button mode={!file ? 'true' : ''}>
            {!file ? 'Add a cover image' : 'Change'}
          </Button>
        </div>
        {file && (
          <Button variation="danger" onClick={() => setFile(null)}>
            Remove
          </Button>
        )}
      </div>
      {file && (
        <Aside>
          <Image
            src={file.preview || file}
            alt=""
            onLoad={() => {
              URL.revokeObjectURL(file.preview)
            }}
          />
        </Aside>
      )}
    </div>
  )
}

export default FileInput
