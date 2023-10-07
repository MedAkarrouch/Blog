import { useState } from 'react'
import styled from 'styled-components'
import Button from './Button'
import Form from './Form'
import FormRow from './FormRow'
import Input from './Input'
import { useDeleteAccount } from './useDeleteAccount'

function UpdateUserPassword({ children }) {
  const [currentPassword, setCurrentPassword] = useState('')
  const { isDeleting, deleteMe } = useDeleteAccount()

  const onClear = () => {
    setCurrentPassword('')
  }

  const onSubmit = (e) => {
    e.preventDefault()
    deleteMe(
      { currentPassword },
      {
        onSettled: () => {
          onClear()
        },
      },
    )
  }

  return (
    <Form onSubmit={onSubmit}>
      <FormRow>{children}</FormRow>
      <FormRow label="Current password">
        <Input
          id="currentPassword"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          disabled={isDeleting}
          type="password"
        />
      </FormRow>
      <FormRow>
        <Button
          variation="secondary"
          size="medium"
          type="reset"
          onClick={onClear}
          disabled={isDeleting}
        >
          Cancel
        </Button>
        <Button
          size="medium"
          variation="danger"
          type="submit"
          disabled={isDeleting}
        >
          Delete account
        </Button>
      </FormRow>
    </Form>
  )
}

export default UpdateUserPassword
