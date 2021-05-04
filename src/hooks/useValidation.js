import { useCallback, useState } from "react"


export const useValidation = initialValue => {
    const [isValid, innerSetIsValid] = useState(initialValue)

    const setIsValid = useCallback((valid = false) => innerSetIsValid(valid), [])

    return [ { isValid, setIsValid }, () => innerSetIsValid(false) ]
}
