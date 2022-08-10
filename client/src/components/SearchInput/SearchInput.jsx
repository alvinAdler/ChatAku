import { FaSearch } from "react-icons/fa"

import "./SearchInput_master.scss"

import FormInput from "../FormInput"
import DefaultButton from '../Buttons'

const SearchInput = ({placeholder="Search your friend", className}) => {
    return (
        <div className={`search-input-container ${className}`}>
            <FormInput placeholder={placeholder}/>
            <DefaultButton><FaSearch/></DefaultButton>
        </div>
    )
}

export default SearchInput