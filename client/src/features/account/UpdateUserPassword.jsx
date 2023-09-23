import { useState } from "react"
import FileInput from "../../ui/FileInput"
import Button from "./Button"
import Form from "./Form"
import FormRow from "./FormRow"
import Input from "./Input"
import { useUpdateUser } from "./useUpdateUser"

function UpdateUserPassword({ children }) {
  const { isUpdating, updateMe } = useUpdateUser()
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  // const errors = error?.response?.data?.validationErrors
  // console.log(errors)

  const onClear = (e) => {}
  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormRow>{children}</FormRow>
      <FormRow label="Current password">
        <Input
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          disabled={isUpdating}
          type="password"
        />
      </FormRow>
      <FormRow label="New password">
        <Input
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={isUpdating}
          type="password"
        />
      </FormRow>
      <FormRow label="Confirm password">
        <Input
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={isUpdating}
          type="password"
        />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          size="medium"
          type="reset"
          onClick={onClear}
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button size="medium" type="submit" disabled={isUpdating}>
          Update password
        </Button>
      </FormRow>
    </Form>
  )
}

export default UpdateUserPassword
