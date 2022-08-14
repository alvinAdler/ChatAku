import { FaSearch } from "react-icons/fa"
import { useState } from 'react'

import "./SearchInput_master.scss"

import FormInput from "../FormInput"
import DefaultButton from '../Buttons'

const SearchInput = ({placeholder="Search", className, onSearch}) => {

    const [inputValue, setInputValue] = useState("")

    return (
        <div className={`search-input-container ${className}`}>
            <FormInput value={inputValue} placeholder={placeholder}
            onChange={(ev) => setInputValue(ev.target.value)}
            />
            <DefaultButton onClick={() => onSearch(inputValue)}><FaSearch/></DefaultButton>
        </div>
    )
}

export default SearchInput