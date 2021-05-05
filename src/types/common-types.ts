export type ActionT<T, D> = {
  type: T,
  data: D
}

export type ResponseT<T> = {
  data: T,
  resultCode: ResultCodeT
}

export type ResultCodeT = '1' | '0'


export type AuthDataT = {
  id: number,
  email: string,
  login: string
}