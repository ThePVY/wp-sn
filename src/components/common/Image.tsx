import { FC } from 'react'
import styled from 'styled-components'

interface IImage {
  maxWidth: string
  width: string
  maxHeight: string
  height: string
  display: string
}

type ImageT = Readonly<Partial<IImage>>

const StyledImage = styled.img<ImageT>`
  max-width: ${props => props.maxWidth || '100%'};
  width: ${props => props.width || 'auto'};
  max-height: ${props => props.maxHeight || '100%'};
  height: ${props => props.height || 'auto'};
  display: ${props => props.display || 'inline'};
`
const Image: FC<ImageT> = props => <StyledImage {...props} alt='' />

export default Image
