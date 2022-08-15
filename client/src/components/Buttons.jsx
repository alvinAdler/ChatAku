import styled from 'styled-components'

const DefaultButton = styled.button.attrs(attrs => ({...attrs}))`
    padding: 0.5rem;
    color: var(--color-light);
    background-color: var(--color-accent);
    border-radius: 5px;
    text-transform: uppercase;
    cursor: pointer;
    outline: none;
    border: 3px solid var(--color-accent);
    transition: 150ms all ease-in;
    min-width: 3.5rem;

    &:hover, &:focus{
        background-color: var(--color-sub);
    }
`

const DeclineButton = styled(DefaultButton)`
    background-color: var(--color-danger);
    border: 3px solid var(--color-danger);

    &:hover, &:focus{
        background-color: var(--color-danger-dim);
        border-color: var(--color-danger);
    }
`

const SuccessButton = styled(DefaultButton)`
    background-color: var(--color-success);
    border: 3px solid var(--color-success);

    &:hover, &:focus{
        background-color: var(--color-success-dim);
        border-color: var(--color-success);
    }
`

export default DefaultButton

export { DeclineButton, SuccessButton }