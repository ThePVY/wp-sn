import { FC } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: rgb(255, 255, 255);
  color: rgb(39, 41, 41);
  cursor: pointer;
  padding: 5px;

  width: 100%;
  min-width: fit-content;

  border: 1px solid rgb(148, 148, 150);
  border-radius: 5px;

  font-size: 0.8em;
  font-family: sans-serif;

  user-select: none;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`
export const Button: FC = props => <StyledButton {...props} />
