export type ActionT<T, P> = {
  type: T,
  payload: P
}

export type ResponseT<T> = {
  data: T,
  resultCode: ResultCodeT
}

export type ResultCodeT = 1 | 0
