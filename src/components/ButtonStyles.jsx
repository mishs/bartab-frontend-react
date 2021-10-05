import styled from 'styled-components'

export default styled.button`
background: #ddd;
border: 1px solid #0d1117;
cursor: pointer;
padding: .25em .5em;
margin-right: 1em;
margin-bottom: .5em;
color: #0d1117;

&:disabled {
    opacity: 0.5;
    cursor:not-allowed;
}
`
