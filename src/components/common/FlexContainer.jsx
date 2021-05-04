import styled from "styled-components";
import Div from "./Div";

const StyledFlex = styled(Div)`
display: flex;
flex-wrap: ${props => props.wrap || 'nowrap'};
flex-direction: ${props => props.dir || 'row'};
justify-self: ${props => props.jstfSelf || 'flex-start'};
justify-content: ${props => props.jstfCnt || 'stretch'};
align-items: ${props => props.algnItems || 'stretch'};
`;

const FlexContainer = props => <StyledFlex {...props} />

export default FlexContainer