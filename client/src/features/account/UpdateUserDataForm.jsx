import { useState } from "react"
import FileInput from "../../ui/FileInput"
import { useUser } from "../auth/useUser"
import Button from "./Button"
import Form from "./Form"
import FormRow from "./FormRow"
import Input from "./Input"
import { useUpdateUser } from "./useUpdateUser"

function UpdateUserDataForm({ children }) {
  const { isUpdating, updateMe } = useUpdateUser()
  const { user } = useUser()
  const [email, setEmail] = useState(user.email)
  const [fullName, setFullName] = useState(user.fullName)
  const [photo, setPhoto] = useState(null)
  // const errors = error?.response?.data?.validationErrors
  // console.log(errors)

  const onClear = (e) => {
    setEmail(user.email)
    setFullName(user.fullName)
    setPhoto(null)
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append("email", email)
    data.append("fullName", fullName)
    if (photo) data.append("photo", photo)
    updateMe(data, {
      onSuccess: () => {
        e.target.reset()
        setPhoto()
      }
    })
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormRow>{children}</FormRow>
      <FormRow
        label="Email address"
        // error={errors?.find((err) => err.field === "email")?.error}
      >
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Full name">
        <Input
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Profile image">
        <FileInput
          id="image"
          accept="image/*"
          // value={photo}
          onChange={(e) => setPhoto(e.target.files[0])}
          disabled={isUpdating}
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
          Update account
        </Button>
      </FormRow>
    </Form>
  )
}

export default UpdateUserDataForm
