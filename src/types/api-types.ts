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

export type PhotosDT = {
  small: string | null
  large: string | null
}

export type UserDT = {
  id: number
  name: string
  status: string
  photos: PhotosDT
  followed: boolean
}