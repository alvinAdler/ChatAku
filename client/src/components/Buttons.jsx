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

    &:hover{
        background-color: var(--color-sub);
    }
`

export default DefaultButton