import styled from 'styled-components'

const DefaultButton = styled.button`
    padding: 0.5rem;
    color: var(--color-light);
    background-color: var(--color-accent);
    border-radius: 5px;
    text-transform: uppercase;
    cursor: pointer;
    outline: none;
    border: none;
    transition: 150ms all ease-in;

    &:hover, &:active, &:focus{
        background-color: var(--color-sub);
        outline: 3px solid var(--color-accent);
    }
`

export default DefaultButton