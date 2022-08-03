import styled from "styled-components"

const StyledPlaceholderJumbotron = styled.div`
	background-color: var(--color-accent);
	padding: 2rem;
	color: var(--color-light);
	text-align: center;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
	margin-block: 1rem;

	p:first-child {
		font-size: var(--fs-h2);
		font-weight: bold;
	}
`

const PlaceholderJumbotron = ({ title = "Sample Title" }) => {
	return (
		<StyledPlaceholderJumbotron>
			<p>{title}</p>
			<p>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				Dolores hic officiis autem architecto itaque quos, praesentium
				aspernatur nobis a nostrum?
			</p>
		</StyledPlaceholderJumbotron>
	)
}

export default PlaceholderJumbotron
