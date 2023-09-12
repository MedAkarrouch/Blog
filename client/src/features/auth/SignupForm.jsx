import FormRow from "../../ui/FormRow"
import Input from "../../ui/Input"
import Form from "../../ui/Form"
import { useSignup } from "./useSignup"
import { useState } from "react"
import SpinnerMini from "../../ui/SpinnerMini"

function SignupForm() {
  const { isLoading, signup } = useSignup()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()
    signup({ fullName, email, password, passwordConfirm })
  }
  return (
    <Form onSubmit={onSubmit}>
      <Form.Heading as="h2">Create Your Account</Form.Heading>
      <FormRow label="Full name">
        <Input
          disabled={isLoading}
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </FormRow>
      <FormRow label="Email address">
        <Input
          disabled={isLoading}
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password">
        <Input
          disabled={isLoading}
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow label="Confirm password">
        <Input
          disabled={isLoading}
          id="passwordConfirm"
          type="password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
      </FormRow>
      <Form.Button disabled={isLoading}>
        {!isLoading ? "Sign up" : <SpinnerMini />}
      </Form.Button>
    </Form>
  )
}

export default SignupForm
