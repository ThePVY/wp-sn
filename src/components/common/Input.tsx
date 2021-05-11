import { FC } from 'react'
import styled from 'styled-components'

const StyledInput = styled.input`
  min-width: fit-content;
  &:not(input[type='checkbox']) {
    width: 50%;
  }
  background-color: rgb(252, 252, 252);
  color: ${({ color }) => color || 'rgb(118, 124, 124)'};
  border: 1px solid rgb(125, 125, 128);
  border-radius: 5px;

  font-size: 14px;
  padding: 0.3em 0.5em;
  line-height: 1.5em;
  outline: none;
  resize: none;
`

const Input: FC = props => <StyledInput {...props} />

export default Input
