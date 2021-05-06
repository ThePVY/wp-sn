export type ActionT<T, P> = {
  type: T,
  payload?: P
}

export type ResponseT<T> = {
  data: T,
  resultCode?: ResultCodeT
  totalCount?: number
  error?: string | null
}

export type ResultCodeT = 1 | 0

export type ActionHandlerFT<S, P> = (state: S, payload: P ) => S

