import Button from '@/components/common/Button'
import Div from '@/components/common/Div'
import FlexContainer from '@/components/common/FlexContainer'
import SinglePane from '@/components/common/SinglePane/SinglePane'
import { useFormik } from 'formik'
import styled from 'styled-components'

const News = props => {
  const submit = jsonObj => {
    console.log(jsonObj)
  }

  return (
    <SinglePane fixedHeight>
      <Div width='70%' margin='100px auto'>
        <TestForm submit={submit} />
      </Div>
    </SinglePane>
  )
}

export default News

/*---------------------------------------------------------------------------------------------------*/

const Label = styled.label`
  display: flex;
  justify-content: space-between;
  input {
    width: 70%;
    padding: 0.3em;
  }
`

const StyledInput = styled.input`
  border: 1px double;
  border-radius: 2px;
  border-color: ${props => props.error ? '#a54848' : 'grey'};
  padding: 0.3em;
`

const TestForm = props => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    },
    onSubmit: values => {
      formik.setSubmitting(true)
      console.log('submit')
      setTimeout(() => {
        formik.setSubmitting(false)
        formik.setValues(formik.initialValues)
      }, 1500)
    },
    onReset: values => {
      formik.setValues(formik.initialValues)
      console.log('reset')
    },
    validate: values => {
      const storage = window.sessionStorage
      storage.setItem('firstName', values.firstName)

      const errors = {}
      if (!values.firstName) {
        errors.firstName = 'Required'
      } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less'
      }

      if (!values.lastName) {
        errors.lastName = 'Required'
      } else if (values.firstName.length > 20) {
        errors.firstName = 'Must be 20 characters or less'
      }

      if (!values.email) {
        errors.email = 'Required'
      } else if (!/^[^/s]+@[^/s]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email'
      }

      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 6) {
        errors.password = 'Must be 6 characters of more'
      } else if (!/[A-Z]/.test(values.password) || !/[a-z]/.test(values.password) || !/[0-9]/.test(values.password)) {
        errors.password = 'Invalid password'
      }

      return errors
    }
  })

  return (
    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
      <Div margin='0.5em 0'>
        <Label htmlFor='firstName'>
          <span>First Name:</span>
          <StyledInput
            type='text'
            name='firstName'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.firstName && formik.errors.firstName}
          />
        </Label>
        <Div textAlign='left' color='#a54848'>
          {formik.touched.firstName && formik.errors.firstName}
        </Div>
      </Div>
      <Div margin='0.5em 0'>
        <Label htmlFor='lastName'>
          Last Name:
          <input
            type='text'
            name='lastName'
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.lastName && formik.errors.lastName}
          />
        </Label>
        <Div textAlign='left' color='#a54848'>
          {formik.touched.lastName && formik.errors.lastName}
        </Div>
      </Div>
      <Div margin='0.5em 0'>
        <Label htmlFor='email'>
          Email Address:
          <input
            type='email'
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && formik.errors.email}
          />
        </Label>
        <Div textAlign='left' color='#a54848'>
          {formik.touched.email && formik.errors.email}
        </Div>
      </Div>
      <Div margin='0.5em 0'>
        <Label htmlFor='password'>
          Password:
          <input
            type='password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && formik.errors.password}
          />
        </Label>
        <Div textAlign='left' color='#a54848'>
          {formik.touched.password && formik.errors.password}
        </Div>
      </Div>
      <FlexContainer jstfCnt='space-between'>
        <Button type='submit' flex='0 1 45%' disabled={formik.isSubmitting}>
          Submit
        </Button>
        <Button type='reset' flex='0 1 45%' disabled={formik.isSubmitting}>
          Reset
        </Button>
      </FlexContainer>
    </form>
  )
}
