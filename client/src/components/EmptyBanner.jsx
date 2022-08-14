import styled from 'styled-components'

const EmptyBanner = styled.div.attrs((attrs) => ({...attrs}))`
    background-color: var(--color-light-dim);
    border-radius: 5px;
    padding: 2rem;
    text-align: center;
    box-shadow: 5px 5px 15px -10px var(--color-dark);
    width: 80%;

    *:first-child{
        font-size: var(--fs-h2);
        font-weight: 500;
    }
`

export default EmptyBanner