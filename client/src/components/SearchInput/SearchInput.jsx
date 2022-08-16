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

    const inputChecker = () => {
        if(inputValue === ""){
            alert("No empty input allowed")
            return
        }

        onSearch(inputValue)
    }

    return (
        <div className={`search-input-container ${className}`}>
            <FormInput value={inputValue} placeholder={placeholder}
            onChange={(ev) => setInputValue(ev.target.value)}
            />
            <DefaultButton type="button" onClick={inputChecker}><FaSearch/></DefaultButton>
        </div>
    )
}

export default SearchInput