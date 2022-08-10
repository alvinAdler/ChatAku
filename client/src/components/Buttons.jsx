import styled from 'styled-components'

const DefaultButton = styled.button.attrs(attrs => ({...attrs}))`
    padding: 0.5rem;
    color: var(--color-light);
    background-color: var(--color-accent);
    border-radius: 5px;
    text-transform: uppercase;
    cursor: pointer;
    outline: none;
    border: 3px solid transparent;
    transition: 150ms all ease-in;
    min-width: 3.5rem;

    &:hover, &:active, &:focus{
        background-color: var(--color-sub);
        border-color: var(--color-accent);
    }
`

export default DefaultButton