import React from 'react'
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.aside`
    box-sizing: border-box;
    background-color: rgb(255, 255, 255);
    grid-area       : side;
    padding-left    : 1em;
    margin: 1vh 0px;
    div {
        padding: 0.5em 0;
    }
    nav {
        position: -webkit-sticky;
        position: sticky;
        top     : 20px;
    }
    a {
        color:rgb(122, 134, 134);
        text-decoration: none;
    }
    a:hover {
        font-weight: 500;
    }
`

const activeClassName = 'nav-item-active'

const StyledLink = styled(NavLink).attrs({ activeClassName })`
    &.${activeClassName} {
        color:rgb(174, 182, 182);
    }
`


const Sidebar = () => {
    return (
        <Wrapper>
            <nav>
                <div>
                    <StyledLink to='/profile' >Profile</StyledLink>
                </div>
                <div>
                    <StyledLink to='/dialogs' >Messages</StyledLink>
                </div>
                <div>
                    <StyledLink to='/news' >News</StyledLink>
                </div>
                <div>
                    <StyledLink to='/users' >Users</StyledLink>
                </div>
                <div>
                    <StyledLink to='/images' >Images</StyledLink>
                </div>
                <div>
                    <StyledLink to='/music' >Music</StyledLink>
                </div>
                <div>
                    <StyledLink to='/video' >Video</StyledLink>
                </div>
            </nav>
        </Wrapper>
    );
};

export default Sidebar;