import styled from "styled-components";

const StyledTextarea = styled.textarea`
  min-width: fit-content;
  width: 100%;
  background-color: rgb(252, 252, 252);
  color: ${({ color }) => color || "rgb(118, 124, 124)"};
  border: 1px solid rgb(125, 125, 128);
  border-radius: 5px;

  font-size: 14px;
  padding: 0.5em 0.5em;
  line-height: 1.5em;
  outline: none;
  resize: none;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`;

const Textarea = (props) => <StyledTextarea {...props} />

export default Textarea
