import logo from "images/logo.png";
import { NavLink } from "react-router-dom";
import Button from "../common/Button";
import styled, { css, keyframes } from "styled-components";
import Div from "../common/Div";
import FlexContainer from "../common/FlexContainer";

const Wrapper = styled.div`
  background-color: rgb(245, 245, 245);
  grid-area: header;
  display: grid;
  grid-template-columns: 1fr minmax(150px, 1fr) minmax(800px, 7fr) 1fr;
  height: 6vh;
  transition: all 0.4s ease 0s;
  img {
    height: 5vh;
    grid-column: 2 / 3;
    align-self: center;
  }
`;

const StyledLogo = styled.img`
  ${(props) =>
    props.spinLogo &&
    css`
      display: inline-block;
      position: relative;
      animation-name: ${spinAnimation};
      animation-duration: 1500ms;
      animation-iteration-count: 1;
      animation-direction: normal;
    `}
`;

const spinAnimation = keyframes`
  0% {
    transform: scale(1, 1) rotate(0deg);
  }
  50% {
    transform: scale(-1, 1) rotate(180deg);
  }
  100% {
    transform: scale(1, 1) rotate(360deg);
  }
`;

const Header = ({ isAuthorized = false, spinLogo, login, handleSignOut }) => {
  return (
    <Wrapper>
      <StyledLogo
        src={logo}
        alt="Logo"
        className="spinning-logo"
        spinLogo={spinLogo}
      />
      <FlexContainer
        width="10em"
        jstfSelf="flex-end"
        jstfCnt="space-between"
        algnItems="center"
      >
        {isAuthorized ? (
          <>
            <Div height='fit-content'>
              <span>{login}</span>
            </Div>

            <Div height='fit-content'>
              <Button onClick={handleSignOut}>Sign Out</Button>
            </Div>
          </>
        ) : (
          <Div height='fit-content'>
            <Button>
              <NavLink to="/login">Sign in</NavLink>
            </Button>
          </Div>
        )}
      </FlexContainer>
    </Wrapper>
  );
};

export default Header;