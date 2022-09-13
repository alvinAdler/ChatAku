import { FaSearch } from "react-icons/fa"
import { useState } from 'react'

import "./SearchInput_master.scss"

import FormInput from "../FormInput"
import DefaultButton from '../Buttons'

const defaultOnSearch = () => {
    console.warn("No search callback provided")
}

const SearchInput = ({placeholder="Search", className, onSearch=defaultOnSearch}) => {

    const [inputValue, setInputValue] = useState("")

    //TODO: Add a feature for the user to clear input.
    /*
    When the user clears do that action, provide a callback function from the parent
    in response to that action.
    */

    const inputChecker = (ev) => {

        ev.preventDefault()

        if(inputValue === ""){
            alert("No empty input allowed")
            return
        }

        onSearch(inputValue)
    }

    return (
        <form className={`search-input-container ${className}`} onSubmit={inputChecker}>
            <FormInput value={inputValue} placeholder={placeholder}
            onChange={(ev) => setInputValue(ev.target.value)}
            />
            <DefaultButton type="submit"><FaSearch/></DefaultButton>
        </form>
    )
}

export default SearchInput