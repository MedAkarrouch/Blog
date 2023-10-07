import styled from 'styled-components'
const StyledCheckbox = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  & input[type='checkbox'] {
    width: 2.4rem;
    height: 2.4rem;
  }
  & label {
  }
`
function Checkbox({ id, disabled, checked, onChange, children }) {
  return (
    <StyledCheckbox>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <label htmlFor={id}>{children}</label>
    </StyledCheckbox>
  )
}

export default Checkbox
