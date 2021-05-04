import { connect } from 'react-redux'
import { compose } from 'redux'
import { thunkCreator } from '../../../redux/auth-reducer'
import SinglePane from '../../common/SinglePane/SinglePane'
import Slider from '../../common/Slider/Slider'
import ViewPanel from '../../common/ViewPanel/ViewPanel'
import { useState } from 'react'
import { useObservers } from '../../../hooks/useObservers'
import Div from '../../common/Div'
import styled from 'styled-components'
import Image from '../../common/Image'


const images = [
    { id: 0, url: 'https://printfiles.ru/files/uploads/raspechatat/tsyfry-formata-a4/0.jpg', },
    { id: 1, url: 'https://printfiles.ru/files/uploads/raspechatat/tsyfry-formata-a4/1-800x1131.jpg' },
    { id: 2, url: 'https://printfiles.ru/files/uploads/raspechatat/tsyfry-formata-a4/2-800x1131.jpg' },
    { id: 3, url: 'https://printfiles.ru/files/uploads/raspechatat/tsyfry-formata-a4/3-800x1131.jpg' },
    { id: 4, url: 'https://printfiles.ru/files/uploads/raspechatat/tsyfry-formata-a4/4-800x1131.jpg' },
    { id: 5, url: 'https://printfiles.ru/files/uploads/raspechatat/tsyfry-formata-a4/5.jpg' },
    { id: 6, url: 'https://printfiles.ru/files/uploads/raspechatat/tsyfry-formata-a4/6.jpg' },
    { id: 7, url: 'https://printfiles.ru/files/uploads/raspechatat/tsyfry-formata-a4/7.jpg' },
]

const StyledImage = styled(Image)`
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`

const Images = props => {

    const [showViewPanel, setShowViewPanel] = useState(false)
    const [content, setContent] = useState('Content')
    const [[exitObservers, exitObserver],] = useObservers([])
    const [currImageId, setCurrImageId] = useState(0)

    const viewPanelContent = (src) => <StyledImage src={src} alt='' display='inline-block' />

    const onImageClick = (image) => {
        setContent(viewPanelContent(image.url))
        setShowViewPanel(true)
        setCurrImageId(image.id)
    }

    const nextImage = () => {
        const nextId = getNextItemId(currImageId, images)
        setCurrImageId(nextId)
        setContent(viewPanelContent(images[nextId].url))
    }

    const prevImage = () => {
        const prevId = getPrevItemId(currImageId, images)
        setCurrImageId(prevId)
        setContent(viewPanelContent(images[prevId].url))
    }

    const onPanelClose = () => {
        setShowViewPanel(false)
        exitObservers.forEach(fn => fn())
    }

    return (
        <>
            <SinglePane fixedHeight={true}>
                {
                    showViewPanel &&
                    <ViewPanel isShown={showViewPanel} content={content} multiple={true}
                        onNext={nextImage} onPrev={prevImage} onClose={onPanelClose} />
                }
                <Div width='100%' height='100%'>
                    <Slider images={images} onImageClick={onImageClick} exitObserver={exitObserver} />
                </Div>
            </SinglePane>
        </>
    )
}

export default compose(
    connect(null, { ...thunkCreator })
)(Images)

/*---------------------------------------------------------------------------------------------------*/

const getNextItemId = (currIndex, arr) => {
    return currIndex === arr.length - 1 ? 0 : currIndex + 1
}

const getPrevItemId = (currIndex, arr) => {
    return currIndex === 0 ? arr.length - 1 : currIndex - 1
}