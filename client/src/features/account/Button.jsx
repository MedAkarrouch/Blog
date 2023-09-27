import styled, { css } from "styled-components"
const sizes = {
  small: css`
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    text-transform: uppercase;
    font-weight: 600;
    text-align: center;
  `,
  medium: css`
    font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
    font-weight: 500;
  `,
  large: css`
    font-size: 1.6rem;
    padding: 1.2rem 2.4rem;
    font-weight: 500;
  `
}
const variations = {
  primary: css`
    color: #fff;
    background-color: var(--color-orange-400);
    &:hover {
      background-color: var(--color-orange-500);
    }
  `,
  secondary: css`
    color: var(--color-grey-600);
    background-color: #fff;
    border: 1px solid var(--color-grey-200);
    &:hover {
      background-color: var(--color-grey-50);
    }
  `,
  danger: css`
    color: var(--color-red-100);
    color: #fff;
    background-color: var(--color-red-600);
    &:hover {
      background-color: var(--color-red-700);
    }
  `,
  showMore: css`
    background-color: transparent;
    box-shadow: none;
    text-transform: capitalize;
    padding: 0;
    padding-left: 0.5rem;
    font-size: 1.25rem;
    color: var(--color-grey-500);
  `
}
const Button = styled.button`
  border: none;
  border-radius: 5px;
  box-shadow: var(--shadow-sm);
  transition: all 0.2s;
  font: inherit;
  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`
Button.defaultProps = {
  variation: "primary",
  size: "small"
}
export default Button
