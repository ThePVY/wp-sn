export type AuthMeDT = {
  id: number
  email: string
  login: string
}

export type GetUsersDT = {
  count: number
  page: number
  term?: string
  friend?: string
}

export type UserPhotosDT = {
  small: string | null
  large: string | null
}

export type UserDT = {
  id: number
  name: string
  status: string
  photos: UserPhotosDT
  followed: boolean
}

export type UserContactsDT = {
  github: string | null
  vk: string | null
  facebook: string | null
  instagram: string | null
  twitter: string | null
  website: string | null
  youtube: string | null
  mainLink: string | null
}

export type UserProfileDT = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string | null
  fullName: string | null
  contacts: UserContactsDT | null
  photos: UserPhotosDT | null
}

export type MessageDT = {
  id: number
  message: string
  my: boolean
}

export type DialogDT = {
  id: number
  name: string
  src: string
  preview: string,
  messages: MessageDT[]
}
