import styled from "styled-components";

const StyledImage = styled.img`
    max-width: ${props => props.maxWidth || '100%'};
    width: ${props => props.width || 'auto'};
    max-height: ${props => props.maxHeight || '100%'};
    height: ${props => props.height || 'auto'};
    display: ${props => props.display || 'inline'}
`
const Image = props => <StyledImage {...props} alt='' />

export default Image