import styled from "styled-components"
import { useId } from "react"

const FormInput = styled.input`
	display: inline-block;
	background-color: var(--color-light);
	border: 2px solid var(--color-less);
	padding: 0.5rem;
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
	border: 2px solid blue;

	label {
		cursor: text;
		font-size: var(--fs-small);
	}

	input {
		width: 100%;
	}
`

const LabeledFormInput = ({ label, ...rest }) => {
	const currentId = useId()

	return (
		<StyledLabeledFormInput>
			<label htmlFor={currentId}>{label}</label>
			<FormInput id={currentId} {...rest} />
		</StyledLabeledFormInput>
	)
}

export { LabeledFormInput }

export default FormInput
