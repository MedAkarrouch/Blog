import styled from 'styled-components'
import { Link } from 'react-router-dom'
import FormRow from '../../ui/FormRow'
import Form from '../../ui/Form'
import Input from '../../ui/Input'
import { useLogin } from './useLogin'
import { useState } from 'react'
import SpinnerMini from '../../ui/SpinnerMini'

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  & div:nth-child(2) {
    border-radius: 15px;
    height: 2.5px;
    width: 100%;
    background-color: var(--color-grey-100);
  }
`
const StyledLink = styled(Link)`
  color: var(--color-orange-500);
  font-weight: 500;
  &:hover {
    color: var(--color-orange-600);
  }
`
const StyldeFooterDiv = styled.div`
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
  const [email, setEmail] = useState('akro@email.io')
  const [password, setPassword] = useState('12345678')
  const allowLogIn = email.length >= 5 && password.length >= 5

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
      <Form.Button disabled={isLoading}>
        {!isLoading ? 'Log in' : <SpinnerMini />}
      </Form.Button>
      <StyledDiv>
        <StyledLink to="/forgotPassword">Forgot Password?</StyledLink>
        <div></div>
        <StyldeFooterDiv>
          <div>Don't have an account</div>
          <StyledLink to="/signup">Signup</StyledLink>
        </StyldeFooterDiv>
      </StyledDiv>
    </Form>
  )
}

export default LoginForm
