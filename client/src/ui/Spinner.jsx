import styled, { css, keyframes } from "styled-components"

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    };
      100% {
        transform: rotate(360deg);
    }
`
const Spinner = styled.span`
  width: 6.4rem;
  height: 6.4rem;
  /* margin: 0 auto; */
  border: 5px solid var(--color-orange-400);
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotate} 1s linear infinite;
`
const Wrapper = styled.div`
  ${(props) => css`
    height: calc(100vh - ${props.subtract});
  `}
  display: flex;
  align-items: center;
  justify-content: center;
  /* padding: 4.8rem 0; */
`
Wrapper.defaultProps = {
  subtract: "0px"
}
Spinner.Wrapper = Wrapper

export default Spinner
