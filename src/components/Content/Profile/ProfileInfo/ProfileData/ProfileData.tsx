import Div from '@/components/common/Div'
import Span from '@/components/common/Span'
import UL from '@/components/common/UL'
import { FC } from 'react'
import styled from 'styled-components'
import { validateURL } from '../../../../../scripts/scripts'
import Preloader from '../../../../common/Preloader'
import { ProfilePropsT } from '../../Profile'

interface IProfileDataProps {
  data: ProfilePropsT['data']
}

const ProfileData: FC<IProfileDataProps> = ({ data: { aboutMe, fullName, contacts } }) => {
  return (
    <>
      <AboutMe aboutMe={aboutMe} fullName={fullName} />
      <Contacts contacts={contacts} />
    </>
  )
}

export default ProfileData

/*-------------------------------------------------------------------------*/

interface IAboutMeProps {
  aboutMe: IProfileDataProps['data']['aboutMe']
  fullName: IProfileDataProps['data']['fullName']
}

const AboutMe: FC<IAboutMeProps> = ({ aboutMe, fullName }) => {
  return (
    <Div textAlign="center" margin="1em 0">
      <Div textAlign="center">
        <Span fontWeight="500">Name</Span>
      </Div>

      <Div textAlign="center" padding="0 0 1em 0">
        <Span fontWeight="400">{fullName}</Span>
      </Div>

      <Div textAlign="center">
        <Span fontWeight="500">About Me</Span>
      </Div>
      <Span fontWeight="400">{aboutMe}</Span>
    </Div>
  )
}

/*-------------------------------------------------------------------------*/

const WrapperContacts = styled(Div)`
  margin: 10px 0px;
  a {
    color: rgb(72, 78, 78);
  }
  a:hover {
    color: rgb(148, 158, 158);
  }
`

interface IContactsProps {
  contacts: IProfileDataProps['data']['contacts']
}

const Contacts: FC<IContactsProps> = ({ contacts }) => {
  if (!contacts) {
    return <Preloader isFetching />
  }
  return (
    <WrapperContacts>
      <Div textAlign="center">
        <Span>Contacts</Span>
      </Div>
      <Div textAlign="center">
        <UL>
          {Object.keys(contacts).reduce(
            (acc, key) =>
              contacts[key]
                ? [
                    acc,
                    <li key={key}>
                      {key} - <a href={validateURL(contacts[key])}>{contacts[key]}</a>
                    </li>
                  ]
                : acc,
            []
          )}
        </UL>
      </Div>
    </WrapperContacts>
  )
}
