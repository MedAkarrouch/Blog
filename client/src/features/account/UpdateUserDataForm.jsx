import FileInput from "../../ui/FileInput"
import Button from "./Button"
import Form from "./Form"
import FormRow from "./FormRow"
import Input from "./Input"

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
        <FileInput id="image" />
      </FormRow>
      <FormRow>
        <Button variation="secondary" size="medium" type="reset">
          Cancel
        </Button>
        <Button size="medium" type="submit">
          Update account
        </Button>
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
