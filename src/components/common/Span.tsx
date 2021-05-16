import styled from "styled-components";

interface IProps {
  fontWeight: string
}

type PropsT = Partial<Readonly<IProps>>

const Span = styled.span<PropsT>`
  font-weight: ${(props) => props.fontWeight || 'normal'};
`

export default Span