import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'

const getSavedValue = (key, initialState) => {
    let savedValue = Cookies.get(key)

    if(!savedValue) return initialState

    savedValue = JSON.parse(savedValue)

    if(initialState instanceof Function) return initialState()

    return savedValue
}

const useCookie = (initialState, key) => {
    const [storedValue, setStoredValue] = useState(() => getSavedValue(key, initialState))

    useEffect(() => {
        Cookies.set(key, JSON.stringify(storedValue))
    }, [storedValue])

    return [storedValue, setStoredValue]
}

export default useCookie