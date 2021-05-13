import { useCallback, useState } from 'react'

type SetObject = {
  isValid: boolean
  setIsValid: (valid: boolean) => void
}
type ResetFn = () => void
type ReturnT = [SetObject, ResetFn]

export const useValidation = (initialState: boolean): ReturnT => {
  const [isValid, innerSetIsValid] = useState(initialState)

  const setIsValid = useCallback((valid = false) => innerSetIsValid(valid), [])

  return [{ isValid, setIsValid }, () => innerSetIsValid(false)]
}
