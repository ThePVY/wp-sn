import defaultUserImage from '../../../../../images/user-image.png'
import { Field, reduxForm } from 'redux-form';
import { noErrorRequired } from '../../../../../scripts/validates';
import { useState } from 'react';
import { Button } from '../../../../common/Button';
import styled, { keyframes } from 'styled-components'
import arrowUp from '../../../../../images/arrow-icon-up.png'
import arrowDown from '../../../../../images/arrow-icon-down.png'
import Div from '../../../../common/Div';
import FileLabel from '../../../../common/FileLabel';
import Image from '../../../../common/Image';


const AvaContainer = styled(Div)`
    width: 90%;
    margin: 0 auto;
    min-width: 250px;
    height: fit-content;
    
    border: 1px solid grey;
    border-radius: 1em;

    img {
        max-width: 200px;
        border-radius: 100px;
    }
`

const Panel = styled(Div)`
    width: 90%;
    height: 1.2em;
    margin: 1em auto;
    border-radius: 10px;
    background-color: rgb(243, 241, 241);
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    cursor: pointer;
    text-align: center;
    user-select: none;
    background-image: ${props => props.editMode ? `url(${arrowUp})` : `url(${arrowDown})`};
`

const dropDownAnimation = keyframes`
    0% { transform: scaleY(0); }
    80% { transform: scaleY(1.1); }
    100% { transform: scaleY(1); }
`

const DropDownContainer = styled(Div)`
    display: ${props => props.editMode ? 'block' : 'none'};
    animation: ${dropDownAnimation} 300ms ease-in-out forwards;
    transform-origin: top center;
`

const Ava = ({ photos = {}, uploadPhoto }) => {

    const [editMode, setEditMode] = useState(false)

    const showForm = () => setEditMode(!editMode)

    return (
        <AvaContainer >
            <Div padding='1em 0' textAlign='center'>
                {
                    photos.large ?
                        <Image src={photos.large} maxWidth='150px' />
                        :
                        <Image src={defaultUserImage} maxWidth='150px' />
                }
            </Div>
            <Panel editMode={editMode} onClick={showForm} />
            <DropDownContainer editMode={editMode} margin='0 0 0.5rem 0' >
                <AddPhotoForm onSubmit={uploadPhoto} mime='.jpg, .png' />
            </DropDownContainer>
        </AvaContainer>
    );
};

export default Ava;


let AddPhotoForm = props => {

    const [isValid, setIsValid] = useState(false)

    const renderInput = ({ input, type, meta }) => {
        const { mime } = props
        setIsValid(meta.valid)
        return (
            <FileLabel>
                Choose photo
                <input name={input.name} type={type} accept={mime} onChange={e => handleChange(e, input)} />
            </FileLabel>
        )
    }

    const handleChange = (e, input) => {
        e.preventDefault()
        input.onChange(e.target.files[0])
    }

    return (
        <Div as='form' onSubmit={props.handleSubmit} width='90%' margin='0 auto' >
            <Div margin='0 0 0.5em 0' textAlign='center'>
                <Field component={renderInput} name='photo' type='file' validate={[noErrorRequired]} />
            </Div>

            <Div>
                <Button type='submit' disabled={!isValid} >Upload File</Button>
            </Div>
        </Div>
    )
}

AddPhotoForm = reduxForm({ form: 'add-photo' })(AddPhotoForm)