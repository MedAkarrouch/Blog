import styled from 'styled-components'
import Heading from './Heading'

const StyledForm = styled.form`
  background-color: #fff;
  /* padding: 4rem 3rem; */
  /* padding-top: 3rem; */
  padding: 3rem 4rem 3rem 3rem;
  box-shadow:
    0 1px 3px 0 rgb(0 0 0 / 0.1),
    0 1px 2px -1px rgb(0 0 0 / 0.1);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 5px;
  font-size: 1.4rem;
  @media screen and (max-width: 25em) {
    /* padding: 2rem 1.5rem; */
    /* max-width: 45rem; */
    /* padding: 2rem 1.5rem; */
    /* margin: 0 auto; */
  }
`
const StyledHeading = styled(Heading)`
  font-size: 3rem;
  color: var(--color-grey-600);
  text-align: center;
  margin-bottom: 2rem;
`
const Button = styled.button`
  background-color: var(--color-orange-400);
  color: #fff;
  border: none;
  padding: 1.2rem 2.4rem;
  border-radius: 5px;
  font-weight: 500;
  display: block;
  box-shadow: var(--shadow);
  margin-top: 1rem;
  &:hover {
    background-color: var(--color-orange-500);
  }
`

function Form({ children, onSubmit }) {
  return <StyledForm onSubmit={onSubmit}>{children}</StyledForm>
}

Form.Heading = StyledHeading
Form.Button = Button

export default Form
