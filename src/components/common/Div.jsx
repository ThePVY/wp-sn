import styled from "styled-components";

const StyledDiv = styled.div`
  box-sizing  : border-box;
  width       : ${({ width }) => width || "100%"};
  height      : ${({ height }) => height || "100%"};
  align-self  : ${({ alignSelf }) => alignSelf || "center"};
  margin      : ${({ margin }) => margin || "0px"};
  padding     : ${({ padding }) => padding || "0px"};
  text-align  : ${({ textAlign }) => textAlign || "left"};
  color       : ${({ color }) => color || "rgb(72, 78, 78)"};
  z-index     : ${({ zIndex }) => zIndex || "unset"};
`;

const Div = (props) => <StyledDiv {...props} />;

export default Div;
