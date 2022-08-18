import { useState } from 'react'
import styled from "styled-components"
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useId } from "react"

const FormInput = styled.input`
	display: inline-block;
	background-color: var(--color-light);
	border: 2px solid var(--color-less);
	padding: 0.8rem;
	border-radius: 5px;
	outline: none;
	transition: 150ms border ease-in;

	&:focus,
	&:active {
		border-color: var(--color-accent);
	}
`

const StyledLabeledFormInput = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	label {
		cursor: text;
		font-size: var(--fs-small);
	}

	input, div {
		width: 100%;
	}
`

const LabeledFormInput = ({ label, id, ...rest }) => {
	const currentId = useId()

	return (
		<StyledLabeledFormInput id={id}>
			<label htmlFor={currentId}>{label}</label>
			<FormInput id={currentId} {...rest} />
		</StyledLabeledFormInput>
	)
}

const StyledPasswordInput = styled.div`
	display: flex;
	align-items: stretch;
	position: relative;

	input{
		flex-grow: 1;
		width: 100%;
	}

	button{
		color: var(--color-dark);
		flex: 0 0 10%;
		position: absolute;
		right: 0.5rem;
		top: 50%;
		transform: translateY(-50%);

		font-size: 1.25rem;
		cursor: pointer;
		background: none;
		outline: none;
		border: none;
		background-color: var(--color-light);
		transition: 150ms color ease-in-out;

		&:hover, &:active, &:focus{
			color: var(--color-accent);
		}
	}
`

const PasswordInput = ({...attrs}) => {

	const [inputType, setInputType] = useState("password")

	function handleInputTypeChange(){
		setInputType(prevState => prevState === "password" ? "text" : "password")
	}

	return(
		<StyledPasswordInput>
			<FormInput type={inputType} {...attrs} autoComplete="off"/>
			<button type="button" onClick={handleInputTypeChange}>
				{inputType === "password" ?
					<FaEye/>
				:
					<FaEyeSlash/>
				}
			</button>
		</StyledPasswordInput>
	)
}

const LabeledPasswordInput = ({ label, id, ...rest }) => {
	const currentId = useId()

	return (
		<StyledLabeledFormInput id={id}>
			<label htmlFor={currentId}>{label}</label>
			<PasswordInput id={currentId} {...rest}/>
		</StyledLabeledFormInput>
	)
}

const RoundedInput = styled(FormInput)`
	border-radius: 999px;
`

export { LabeledFormInput, PasswordInput, LabeledPasswordInput, RoundedInput }

export default FormInput
