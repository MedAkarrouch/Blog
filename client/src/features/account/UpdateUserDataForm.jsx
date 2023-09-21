import Form from "./Form"
import FormRow from "./FormRow"
import styled from "styled-components"

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: #fff;
  border-radius: 5px;
  padding: 0.6rem 1.2rem;
  box-shadow: var(--shadow-sm);
`

function UpdateUserDataForm() {
  return (
    <Form>
      <FormRow label="Email address">
        <Input id="email" />
      </FormRow>
      <FormRow label="Full name">
        <Input id="fullName" />
      </FormRow>
      <FormRow label="Profile image">
        <Input id="image" />
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
