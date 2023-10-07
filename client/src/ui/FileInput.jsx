import styled from 'styled-components'

const FileInput = styled.input.attrs({ type: 'file' })`
  font-size: 1.4rem;
  &::file-selector-button {
    border-radius: 5px;
    font: inherit;
    font-weight: 500;
    border: none;
    padding: 0.9rem 1.2rem;
    background-color: var(--color-orange-400);
    color: #fff;
    cursor: pointer;
    margin-right: 1.2rem;
    transition: background-color 0.2s;
    &:hover {
      background-color: var(--color-orange-500);
    }
  }
`
export default FileInput
