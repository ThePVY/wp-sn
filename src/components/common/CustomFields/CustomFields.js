import { useEffect } from 'react'
import { Field } from 'redux-form'
import styled from 'styled-components'
import Div from '../Div'
import StyledInput from '../Input'
import Textarea from '../Textarea'


const StyledSpan = styled.span`
    padding: 0px 1rem;
`

export const createField = (component, name, type, placeholder, validate, isValid, text = '', isChecked, disabled = false) => {
    return (
        <Div height='fit-content'>
            <Field 
                component={component} name={name} type={type} placeholder={placeholder}
                validate={validate} isValid={isValid} isChecked={isChecked} disabled={disabled}
            />
            { text && <StyledSpan>{text}</StyledSpan> }
        </Div>
    )
}

const ErrorSpan = styled.span`
    color: ${props => props.error ? "rgb(95, 29, 29)" : 'inherit'};
`

export const FieldTemplate = ({ input, meta, notified, children, isValid = a => a, isChecked = a => a }) => {
    
    let notification = ''
    if(meta.touched && notified) {
        notification = meta.error ? meta.error : ''
    }

    const { valid } = meta
    useEffect(() => isValid(valid) ,[valid, isValid])
    const { checked } = input
    useEffect(() => isChecked(checked) ,[checked, isChecked])
    
    return (
        <>
            {children}
            <ErrorSpan>{notification}</ErrorSpan>
        </>
    )
}

export const TextareaTemplate = ({type, placeholder, ...props}) => {
    return (
        <FieldTemplate {...props} notified={true}>
            <Textarea {...props.input} placeholder={placeholder} type={type} disabled={props.disabled} />
        </FieldTemplate>
    )
}

export const Input = ({type, placeholder, ...props}) => {
    return (
        <FieldTemplate {...props} notified={true} >
            <StyledInput {...props.input} placeholder={placeholder} type={type} />
        </FieldTemplate>
    )
}



