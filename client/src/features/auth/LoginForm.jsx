import styled from 'styled-components'
import { Link } from 'react-router-dom'
import FormRow from '../../ui/FormRow'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import { useLogin } from './useLogin'
import { useState } from 'react'
import SpinnerMini from '../../ui/SpinnerMini'

const StyledLink = styled(Link)`
  color: var(--color-orange-500);
  font-weight: 500;
  &:hover {
    color: var(--color-orange-600);
  }
`
const StyldeFooterDiv = styled.div`
  border-top: 2px solid var(--color-grey-100);
  margin-top: 0.5rem;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  & div {
    /* font-weight: 500; */
    color: var(--color-grey-500);
  }
`

function LoginForm() {
  const { login, isLoading } = useLogin()
  const [email, setEmail] = useState('selena@email.io')
  const [password, setPassword] = useState('12345678')

  const onSubmit = (e) => {
    e.preventDefault()
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail('')
          setPassword('')
        },
      },
    )
  }
  return (
    <Form onSubmit={onSubmit}>
      <Form.Heading as="h2">Log In To Your Account</Form.Heading>
      <FormRow label="Email address">
        <Input
          required
          disabled={isLoading}
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password">
        <Input
          required
          disabled={isLoading}
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <Form.Button disabled={isLoading}>
        {!isLoading ? 'Log in' : <SpinnerMini />}
      </Form.Button>
      <StyldeFooterDiv>
        <div>Don't have an account</div>
        <StyledLink to="/signup">Signup</StyledLink>
      </StyldeFooterDiv>
    </Form>
  )
}

export default LoginForm
